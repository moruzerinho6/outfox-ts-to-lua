declare interface ToolsDiscordModule {
  UpdateProfile: (this: ToolsDiscordModule) => void;
  CustomScreenState: (
    this: ToolsDiscordModule,
    State1?: string,
    State2?: string,
    time?: number
  ) => void;
  SendCurrentRound: (this: ToolsDiscordModule) => void;
  SendCurrentSong: (this: ToolsDiscordModule, isPaused: boolean) => void;
  SendStageResults: (this: ToolsDiscordModule) => void;
}
// @ts-expect-error
return {
  UpdateProfile: function (this: ToolsDiscordModule) {
    const player = GAMESTATE.GetMasterPlayerNumber();
    GAMESTATE.UpdateDiscordProfile(GAMESTATE.GetPlayerDisplayName(player));
  },
  CustomScreenState: function (
    this: ToolsDiscordModule,
    State1: string,
    State2: string,
    time: any
  ) {
    GAMESTATE.UpdateDiscordGameMode(GAMESTATE.GetCurrentGame().GetName());
    GAMESTATE.UpdateDiscordScreenInfo(State1 || "", State2 || "", time || 10);
  },
  SendCurrentRound: function (this: ToolsDiscordModule) {
    let message = "";

    if (GAMESTATE.IsCourseMode()) {
      message = "Selecting Course";
    } else {
      const StageIndex = GAMESTATE.GetCurrentStageIndex();
      message = "Selecting Song (Stage " + (StageIndex + 1 as unknown as string) + ")";
    }
    this.UpdateProfile();
    this.CustomScreenState(message);
  },
  SendCurrentSong: function (this: ToolsDiscordModule, isPaused: boolean) {
    const player = GAMESTATE.GetMasterPlayerNumber();

    if (GAMESTATE.GetCurrentSong()) {
      const title: string =
        PREFSMAN.GetPreference("ShowNativeLanguage") ||
        GAMESTATE.GetCurrentSong().GetDisplayMainTitle() ||
        GAMESTATE.GetCurrentSong().GetTranslitFullTitle();
      const songname =
        title + " - " + GAMESTATE.GetCurrentSong().GetGroupName();
      const currentRate = GAMESTATE.GetSongOptionsObject(
        "ModsLevel_Preffered" as unknown as ModsLevel
      ).MusicRate();
      let rateText = "";

      if (currentRate !== 1) {
        string.format("(%.2fx Rate) ", currentRate)
      }

      let state = rateText + "Playing Song";

      if (GAMESTATE.IsDemonstration()) {
        state = "Attract Screen";
      }

      if (isPaused) {
        state = state + " (PAUSED)";
      }

      this.UpdateProfile();

      const stats = STATSMAN.GetCurStageStats();

      if (!stats) {
        return;
      }

      const length = () => {
        if (GAMESTATE.IsCourseMode()) {
          const message =
            GAMESTATE.GetCurrentCourse().GetDisplayFullTitle() +
            " (Song " +
            ((stats.GetPlayerStageStats(player).GetSongsPassed() +
              1) as unknown as string);

          if (
            (GAMESTATE.GetPlayMode() as unknown as string) !==
            "PlayMode_Endless"
          ) {
            return (
              message +
              " of " +
              (GAMESTATE.GetCurrentCourse().GetEstimatedNumStages() as unknown as string) +
              "..)"
            );
          }

          return message + ")" || "";
        }
        return state;
      };
      const timeRemaining =
        GAMESTATE.GetCurrentSong().GetLastSecond() / currentRate;

      if (isPaused) {
        this.CustomScreenState(length(), songname, 0);
        return;
      } else {
        GAMESTATE.UpdateDiscordSongPlaying(length(), songname, timeRemaining);
      }
    }
  },
  SendStageResults: function (this: ToolsDiscordModule) {
    const player = GAMESTATE.GetMasterPlayerNumber();
    let SongOrCourse: Song | Course = GAMESTATE.GetCurrentSong();
    let StepOrTrails: Trail | Steps = GAMESTATE.GetCurrentSteps(player);

    if (GAMESTATE.IsCourseMode()) {
      SongOrCourse = GAMESTATE.GetCurrentCourse();
      StepOrTrails = GAMESTATE.GetCurrentTrail(player);
    }

    if (GAMESTATE.GetCurrentSong()) {
      let details: string;

      if (GAMESTATE.IsCourseMode()) {
        details = SongOrCourse.GetTranslitFullTitle();
      } else {
        if (PREFSMAN.GetPreference("ShowNativeLanguage")) {
          details = (SongOrCourse as Song).GetDisplayMainTitle();
        } else {
          details =
            SongOrCourse.GetTranslitFullTitle() +
            " - " +
            GAMESTATE.GetCurrentSong().GetGroupName();
        }
      }

      if (string.len(details) > 128) {
        details = string.sub(details, 1, 124) + '...'
      }

      const Difficulty =
        ToEnumShortString(StepOrTrails.GetDifficulty()) +
        " " +
        StepOrTrails.GetMeter();
      const Percentage = STATSMAN.GetCurStageStats()
        .GetPlayerStageStats(player)
        .GetPercentDancePoints();
      const states =
        Difficulty + " (" + string.format("%.2f%%", Percentage * 100) + ")";
      this.UpdateProfile();
      this.CustomScreenState(details, states);
    }
  },
};
