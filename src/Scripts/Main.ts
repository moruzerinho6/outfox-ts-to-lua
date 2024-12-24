function OptionNameString(str: string) {
  return THEME.GetString('OptionNames', str)
}

interface ThemeColors {
  RestoreColors: (this: any, colorScheme?: any) => AnyTable
}

GameColor = {
  Custom: (LoadModule<ThemeColors>('Theme.Colors.lua')()).RestoreColors(),
  PlayerColors: {
    PLAYER_1: color('#FF773C'),
    PLAYER_2: color('#FF3CD2'),
    both: color('#FFFFFF')
  },
  PlayerDarkColors: {
    PLAYER_1: color("#843122"),
    PLAYER_2: color("#7A208C"),
		both: color("#F5E1E1"),
  },
  PlayerLightColors: {
		PLAYER_1: color("#FFEDCC"),
		PLAYER_2: color("#FFFFFF"),
	},
  PlayerCompColors: {
    PLAYER_1: color("#FFEDCC"),
    PLAYER_2: color("#FFA3C6"),
    both: color("#F5E1E1"),
  },
  Difficulty: {
    Beginner    : color("#0EA7FF"),
    Easy        : color("#00F4BD"),
    Medium      : color("#FF8100"),
    Hard        : color("#F70825"),
    Challenge   : color("#A907FF"),
    Edit        : color("#9199D4"),
    Couple      : color("#ed0972"),
    Routine     : color("#ff9a00"),
		D7			: color("0.8,0.8,0.8,1"),
		D8			: color("0.8,0.8,0.8,1"),
		D9			: color("0.8,0.8,0.8,1"),
		D10			: color("0.8,0.8,0.8,1"),
		D11			: color("0.8,0.8,0.8,1"),
		D12			: color("0.8,0.8,0.8,1"),
		D13			: color("0.8,0.8,0.8,1"),
		D14			: color("0.8,0.8,0.8,1"),
		D15			: color("0.8,0.8,0.8,1"),
    Difficulty_Beginner : color("#0EA7FF"),
    Difficulty_Easy     : color("#00F4BD"),
    Difficulty_Medium   : color("#FF8100"),
    Difficulty_Hard     : color("#F70825"),
    Difficulty_Challenge    : color("#A907FF"),
    Difficulty_Edit     : color("#9199D4"),
		Difficulty_D7			: color("0.8,0.8,0.8,1"),
		Difficulty_D8			: color("0.8,0.8,0.8,1"),
		Difficulty_D9			: color("0.8,0.8,0.8,1"),
		Difficulty_D10			: color("0.8,0.8,0.8,1"),
		Difficulty_D11			: color("0.8,0.8,0.8,1"),
		Difficulty_D12			: color("0.8,0.8,0.8,1"),
		Difficulty_D13			: color("0.8,0.8,0.8,1"),
		Difficulty_D14			: color("0.8,0.8,0.8,1"),
		Difficulty_D15			: color("0.8,0.8,0.8,1"),
    Difficulty_Couple   : color("#ed0972"),
    Difficulty_Routine  : color("#ff9a00")
  },
  Stage: {
    Stage_1st   : color("#03C5AA"),
    Stage_2nd   : color("#03C5AA"),
    Stage_3rd   : color("#03C5AA"),
    Stage_4th   : color("#03C5AA"),
    Stage_5th   : color("#03C5AA"),
    Stage_6th   : color("#03C5AA"),
    Stage_Next  : color("#03C5AA"),
    Stage_Final : color("#00AEFF"),
    Stage_Extra1    : color("#FF8000"),
    Stage_Extra2    : color("#FF2300"),
    Stage_Nonstop   : color("#934BDD"),
    Stage_Oni   : color("#934BDD"),
    Stage_Endless   : color("#934BDD"),
    Stage_Event : color("#03C5AA"),
    Stage_Demo  : color("#03C5AA")
  },
  Judgment: {
    JudgmentLine_ProW1     : color("#FFFFFF"),
    JudgmentLine_ProW2     : color("#AEEDF3"),
    JudgmentLine_ProW3     : color("#71DDE8"),
    JudgmentLine_ProW4     : color("#A0DBF1"),
    JudgmentLine_ProW5     : color("#7EC2D7"),
    JudgmentLine_W1     : color("#A0DBF1"),
    JudgmentLine_W2     : color("#F1E4A2"),
    JudgmentLine_W3     : color("#ABE39B"),
    JudgmentLine_W4     : color("#86ACD6"),
    JudgmentLine_W5     : color("#958CD6"),
    JudgmentLine_Held   : color("#FFFFFF"),
    JudgmentLine_Miss   : color("#F97E7E"),
    JudgmentLine_MaxCombo   : color("#f0dc9f")
  }
}

let PlayerCompColor = PlayerColor

GameColor.Difficulty['Crazy'] = GameColor.Difficulty['Hard']
GameColor.Difficulty['Freestyle'] = GameColor.Difficulty['Easy']
GameColor.Difficulty['Nighmare'] = GameColor.Difficulty['Challenge']
GameColor.Difficulty['HalfDouble'] = GameColor.Difficulty['Medium']

LoadModule('Row.Prefs.lua')(LoadModule('Options.Prefs.lua'))

SelectMusicOrCourse = () => {
  if (IsNetSMOnline()) {
    return 'ScreenNetSelectMusic'
  } else if (GAMESTATE.IsCourseMode()) {
    return 'ScreenSelectCourse'
  } else {
    return 'LuaSelectMusic'
  }
}

function thified_curstage_index(on_eval: boolean) {
  const numbered_stages = {
    Stage_1st: true,
		Stage_2nd: true,
		Stage_3rd: true,
		Stage_4th: true,
		Stage_5th: true,
		Stage_6th: true,
		Stage_Next: true
  }
  const cur_stage = GAMESTATE.GetCurrentStage()
  let adjust = 1

  if (on_eval) {
    adjust = 0
  }

  if (numbered_stages[cur_stage]) {
    return FormatNumberAndSuffix(GAMESTATE.GetCurrentStageIndex() + adjust)
  } else {
    return ToEnumShortString(cur_stage)
  }
}

Branch.TitleMenu = () => {
  if (GAMESTATE.GetCoinMode() !== 'CoinMode_Home') {
    return 'ScreenTitleMenuJoin'
  }

  return 'ScreenTitleMenuHome'
}

Branch.AfterInit = () => {
  return 'KnownBugs'
}

Branch.AfterProfileLoad = () => {
  return 'ScreenSelectPlayMode'
}

Branch.AfterProfileSave = () => {
  if (GAMESTATE.Env()['ForceEndSession']) {
    return Branch.TitleMenu()
  }

  if (GAMESTATE.Env()['FitnessSessionOver']) {
    return 'ScreenEvaluationSummary'
  }

  if (GAMESTATE.IsEventMode()) {
    return SelectMusicOrCourse()
  } else if (STATSMAN.GetCurStageStats().AllFailed()) {
    return GameOverOrContinue()
  } else if (GAMESTATE.GetSmallestNumStagesLeftForAnyHumanPlayer() === 0) {
    if (!GAMESTATE.IsCourseMode()) {
      return 'ScreenEvaluationSummary'
    } else {
      return GameOverOrContinue()
    }
  } else {
    return SelectMusicOrCourse()
  }
}

Branch.ReturnToMainMenu = () => {
  if (STATSMAN.GetStagesPlayed() > 0) {
    return 'ScreenEvaluationSummary'
  }
  return Branch.TitleMenu()
}

Branch.AfterSelectProfile = () => {
  if (getenv('StartFitness') === true) {
    return 'ScreenFitnessOptions'
  }

  if (THEME.GetMetric('Common', 'AutoSetStyle') === true) {
    return IsNetConnected() ? 'ScreenSelectStyle' : 'ScreenSelectPlayMode'
  } else {
    return 'ScreenProfileLoad'
  }
}

function IsWidescreen() {
  return GetScreenAspectRatio() > 1.6
}

let TF_WHEEL: any = {}

TF_WHEEL.StyleDB = {
  ["dance_single"]    : "single", ["dance_double"]    : "double", ["dance_couple"]    : "couple", ["dance_solo"]        : "solo", ["dance_threepanel"]  : "threepanel", ["dance_routine"] : "routine",
	["pump_single"]     : "single", ["pump_halfdouble"] : "halfdouble", ["pump_double"] : "double", ["pump_couple"]       : "couple", ["pump_routine"]    : "routine",
	["ez2_single"]      : "single", ["ez2_double"]      : "double", ["ez2-real"]        : "real",
	["para_single"]     : "single", ["para_double"]     : "double", ["para_eight"]      : "single-eight",
	["ds3ddx_single"]   : "single",
	["smx_single"]      : "single", ["smx_double6"]     : "double6", ["smx_double10"]   : "double10",
	["bm_single5"]      : "single5", ["bm_double5"]     : "double5", ["bm_single7"]     : "single7", ["bm_double7"]       : "double7",
	["maniax_single"]   : "single", ["maniax_double"]   : "double",
	["techno_single4"]  : "single4", ["techno_single5"] : "single5", ["techno_single8"] : "single8", ["techno_single9"]   : "single9", ["techno_double4"] : "double4", ["techno_double5"]   : "double5", ["techno_double8"] : "double8", ["techno_double9"] : "double9",
	["pnm_three"]       : "popn-three", ["pnm_four"]    : "pnm-four", ["pnm_five"]      : "popn-five", ["pnm_seven"]      : "popn-seven", ["pnm_nine"]    : "popn-nine",
	["gddm_new"]        : "gddm-new", ["gddm_old"]      : "gddm-old",
	["guitar_five"]     : "guitar-five", ["bass_six"]   : "bass-six", ["guitar_six"]    : "guitar-six", ["guitar_three"]  : "guitar-three", ["bass_four"] : "bass-four",
	["gh_solo"]         : "solo", ["gh_solo6"]          : "solo6", ["gh_bass"]          : "bass", ["gh_bass6"]            : "bass6", ["gh_rhythm"]        : "rhythm", ["gh_rhythm6"]        : "rhythm6",
	["kb1_single"]      : "single1", ["kb2_single"]     : "single2", ["kb3_single"]     : "single3", ["kb4_single"]       : "single4", ["kb5_single"]     : "single5", ["kb6_single"]       : "single6", ["kb7_single"]     : "single7", ["kb8_single"]     : "single8", ["kb9_single"] : "single9", ["kb10_single"] : "single10", ["kb11_single"] : "single11", ["kb12_single"] : "single12", ["kb13_single"] : "single13", ["kb14_single"] : "single14", ["kb15_single"] : "single15",
	["taiko"]           : "taiko-single",
	["lights_cabinet"]  : "cabinet",
	["kickbox_human"]   : "human", ["kickbox_quadarm"]  : "quadarm", ["kickbox_insect"] : "insect", ["kickbox_arachnid"]  : "arachnid"
}

TF_WHEEL.MPath = THEME.GetCurrentThemeDirectory() + 'Modules/'

Actor.ForParent = function(this: Actor, Amount: number) {
  let CurSelf = this
  
  for (let i = 0; i < Amount; i++) {
    CurSelf = CurSelf.GetParent()
  }
  
  return CurSelf
}

TF_WHEEL.DiffTab = {
  ["Difficulty_Beginner"]   : 1,
	["Difficulty_Easy"]       : 2,
	["Difficulty_Medium"]     : 3,
	["Difficulty_Hard"]       : 4,
	["Difficulty_Challenge"]  : 5,
	["Difficulty_Edit"]       : 6,
	["Difficulty_D7"]         : 7,
	["Difficulty_D8"]         : 8,
	["Difficulty_D9"]         : 9,
	["Difficulty_D10"]        : 10,
	["Difficulty_D11"]        : 11,
	["Difficulty_D12"]        : 12,
	["Difficulty_D13"]        : 13,
	["Difficulty_D14"]        : 14,
	["Difficulty_D15"]        : 15
}

TF_WHEEL.SearchStates = {
  ["title"]     : true,
  ["artist"]    : false,
  ["genre"]     : false,
  ["subtitle"]  : false,
  ["group"]     : false,
  ["bpm"]       : false,
  ["meter"]     : false
}

TF_WHEEL.CurrentSong = null

TF_WHEEL.Resize = (width: number, height: number, setwidth: number, sethight: number) => {
  if (height >= sethight && width >= setwidth) {
		if (height*(setwidth/sethight) >= width ) {
			return sethight/height
    } else {
			return setwidth/width
    }
  } else if (height >= sethight) {
		return sethight/height
  } else if (width >= setwidth) {
		return setwidth/width
  } else {
		return 1
  }
}

TF_WHEEL.CountingNumbers = function(self: BitmapText, NumStart: number, NumEnd: number, Duration: number, format?: string) {
  self.stoptweening()

  TF_WHEEL.Cur = 1
	TF_WHEEL.Count = new LuaTable()

  if (format === null) {
    format = '%.0f'
  }

  let Length = (NumEnd - NumStart) / 10

  if (string.format("%.0f", Length) === '0') {
    Length = 1
  }

  if (string.format("%.0f", Length) === '-0') {
    Length = -1
  }

  if (!self.GetCommand('Count')) {
    self.addcommand('Count', function(self: BitmapText){
      self.settext(TF_WHEEL.Count[TF_WHEEL.Cur])
      TF_WHEEL.Cur = TF_WHEEL.Cur + 1
    })
  }

  for (let n = NumStart; NumStart < NumEnd; string.format('%.0f', Length)) {
    TF_WHEEL.Count[table.getn(TF_WHEEL.Count) + 1] = string.format(format, n)
    self.sleep(Duration / 10).queuecommand('Count')
  }

  TF_WHEEL.Count[table.getn(TF_WHEEL.Count) + 1] = string.format(format, NumEnd)
  self.sleep(Duration / 10).queuecommand('Count')
}

interface AssumedActorProperties extends Actor {
  pn: (this: Actor) => string
}

TF_WHEEL.Input = function (this: Actor, self: AssumedActorProperties) {
  return function(event) {
    if (!event.PlayerNumber) {
      return;
    }
    self.pn = event.PlayerNumber

    if (ToEnumShortString(event.type) === 'FirstPress' || ToEnumShortString(event.type) === 'Repeat') {
      self.queuecommand(event.GameButton)
    }

    if (ToEnumShortString(event.type) === 'Release') {
      self.queuecommand(event.GameButton + 'Release')
    }
  }
}

let ThemeInfo = {
  BuildDate: 20240305,
  Number: 1237
}

Trace(
  string.format('Current System: %s %s - %s %s [Theme: %s - Build %s]', ProductFamily(),ProductVersion(), VersionDate(), VersionTime(), ThemeInfo.BuildDate, ThemeInfo.Number)
)