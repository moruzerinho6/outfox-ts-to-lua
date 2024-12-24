declare enum EditState {
  EditState_Edit = 0,
  EditState_Record = 1,
  EditState_RecordPaused = 2,
  EditState_Playing = 3
}

declare enum BlendMode {
	BlendMode_Normal = 0,
	BlendMode_Add = 1,
	BlendMode_Subtract = 2,
	BlendMode_Modulate = 3,
	BlendMode_CopySrc = 4,
	BlendMode_AlphaMask = 5,
	BlendMode_AlphaKnockOut = 6,
	BlendMode_AlphaMultiply = 7,
	BlendMode_WeightedMultiply = 8,
	BlendMode_InvertDest = 9,
	BlendMode_NoEffect = 10
}

declare enum ZTestMode {
	ZTestMode_Off = 0,
	ZTestMode_WriteOnPass = 1,
	ZTestMode_WriteOnFail = 2,
}

declare enum VertAlign {
	VertAlign_Top = 0,
	VertAlign_Middle = 1,
	VertAlign_Bottom = 2
}

declare enum TweenType {
	TweenType_Linear = 0,
	TweenType_Accelerate = 1,
	TweenType_Decelerate = 2,
	TweenType_Spring = 3,
	TweenType_Smooth = 4,
	TweenType_BounceBegin = 5,
	TweenType_BounceEnd = 6,
	TweenType_Bezier = 7,
	TweenType_Bezier8D = 9,
	TweenType_Step = 10,
	TweenType_SmoothStep = 11,
	TweenType_EaseInSine = 12,
	TweenType_EaseOutSine = 13,
	TweenType_EaseInOutSine = 14,
	TweenType_EaseOutInSine = 15,
	TweenType_EaseInQuad = 16,
	TweenType_EaseOutQuad = 17,
	TweenType_EaseInOutQuad = 18,
	TweenType_EaseOutInQuad = 19,
	TweenType_EaseInCubic = 20,
	TweenType_EaseOutCubic = 21,
	TweenType_EaseInOutCubic = 22,
	TweenType_EaseOutInCubic = 23,
	TweenType_EaseInQuart = 24,
	TweenType_EaseOutQuart = 25,
	TweenType_EaseInOutQuart = 26,
	TweenType_EaseOutInQuart = 27,
	TweenType_EaseInQuint = 28,
	TweenType_EaseOutQuint = 29,
	TweenType_EaseInOutQuint = 30,
	TweenType_EaseOutInQuint = 31,
	TweenType_EaseInExpo = 32,
	TweenType_EaseOutExpo = 33,
	TweenType_EaseInOutExpo = 34,
	TweenType_EaseOutInExpo = 35,
	TweenType_EaseInBack = 36,
	TweenType_EaseOutBack = 37,
	TweenType_EaseInOutBack = 38,
	TweenType_EaseOutInBack = 39,
	TweenType_EaseInBackEx = 40,
	TweenType_EaseOutBackEx = 41,
	TweenType_EaseInOutBackEx = 42,
	TweenType_EaseOutInBackEx = 43,
	TweenType_EaseInCircle = 44,
	TweenType_EaseOutCircle = 45,
	TweenType_EaseInOutCircle = 46,
	TweenType_EaseOutInCircle = 47,
	TweenType_EaseInElastic = 48,
	TweenType_EaseOutElastic = 49,
	TweenType_EaseInOutElastic = 50,
	TweenType_EaseOutInElastic = 51,
	TweenType_EaseInElasticEx = 52,
	TweenType_EaseOutElasticEx = 53,
	TweenType_EaseInOutElasticEx = 54,
	TweenType_EaseOutInElasticEx = 55,
	TweenType_EaseInBounce = 56,
	TweenType_EaseOutBounce = 57,
	TweenType_EaseInOutBounce = 58,
	TweenType_EaseOutInBounce = 59,
}

declare enum PolygonMode {
	PolygonMode_Fill = 0,
	PolygonMode_Line = 1,
	PolygonMode_Point = 2,
}

declare enum PlayerNumber {
	PlayerNumber_P1 = "PlayerNumber_P1",
	PlayerNumber_P2 = "PlayerNumber_P2"
}

declare enum HorizAlign {
	HorizAlign_Left = 0,
	HorizAlign_Center = 1,
	HorizAlign_Right = 2
}

declare enum CullMode {
	CullMode_Back = 0,
	CullMode_Front = 1,
	CullMode_FrontAndBack = 2,
	CullMode_None = 3,
}

declare enum DrawMode {
	DrawMode_Quads = 0,
	DrawMode_QuadStrip = 1,
	DrawMode_Fan = 2,
	DrawMode_Strip = 3,
	DrawMode_Triangles = 4,
	DrawMode_LineStrip = 5,
	DrawMode_PolyLineStrip = 6,
	DrawMode_LineStripM = 7,
	DrawMode_SymmetricQuadStrip = 8,
	DrawMode_Points = 9,
	DrawMode_Lines = 10,
}

declare enum EffectMode {
	EffectMode_Normal = 0,
	EffectMode_Unpremultiply = 1,
	EffectMode_ColorBurn = 2,
	EffectMode_ColorDodge = 3,
	EffectMode_VividLight = 4,
	EffectMode_HardMix = 5,
	EffectMode_Overlay = 6,
	EffectMode_Screen = 7,
	EffectMode_YUV2RGB = 8,
	EffectMode_DistanceField = 9,
	EffectMode_AlphaBlack = 10,
}

declare enum TextureMode {
	TextureMode_Modulate = 0,
	TextureMode_Glow = 1,
	TextureMode_Add = 2,
}

declare enum SortOrder {
	SortOrder_Preferred = 0,
	SortOrder_Group = 1,
	SortOrder_Title = 2,
	SortOrder_BPM = 3,
	SortOrder_Popularity = 4,
	SortOrder_TopGrades = 5,
	SortOrder_Artist = 6,
	SortOrder_Genre = 7,
	SortOrder_BeginnerMeter = 8,
	SortOrder_EasyMeter = 9,
	SortOrder_MediumMeter = 10,
	SortOrder_HardMeter = 11,
	SortOrder_ChallengeMeter = 12,
	SortOrder_DoubleEasyMeter = 13,
	SortOrder_DoubleMediumMeter = 14,
	SortOrder_DoubleHardMeter = 15,
	SortOrder_DoubleChallengeMeter = 16,
	SortOrder_ModeMenu = 17,
	SortOrder_AllCourses = 18,
	SortOrder_Nonstop = 19,
	SortOrder_Oni = 20,
	SortOrder_Endless = 21,
	SortOrder_Length = 22,
	SortOrder_Roulette = 23,
	SortOrder_Recent = 24,
}

declare enum TextGlowMode {
	TextGlowMode_Inner = 0,
	TextGlowMode_Stroke = 1,
	TextGlowMode_Both = 2,
}

declare enum PlayMode {
	PlayMode_Regular = 0,
	PlayMode_Nonstop = 1,
	PlayMode_Oni = 2,
	PlayMode_Endless = 3,
	PlayMode_Battle = 4,
	PlayMode_Rave = 5,
}

declare enum StepsType {
	StepsType_Dance_Single = 0,
	StepsType_Dance_Double = 1,
	StepsType_Dance_Couple = 2,
	StepsType_Dance_Solo = 3,
	StepsType_Dance_Threepanel = 4,
	StepsType_Dance_Routine = 5,
	StepsType_Pump_Single = 6,
	StepsType_Pump_Halfdouble = 7,
	StepsType_Pump_Double = 8,
	StepsType_Pump_Couple = 9,
	StepsType_Pump_Routine = 10,
	StepsType_Kb7_Single = 11,
	StepsType_Ez2_Single = 12,
	StepsType_Ez2_Double = 13,
	StepsType_Ez2_Real = 14,
	StepsType_Para_Single = 15,
	StepsType_Para_Double = 16,
	StepsType_Para_Eight = 17,
	StepsType_Ds3ddx_Single = 18,
	StepsType_Bm_Single5 = 19,
	StepsType_Bm_Double5 = 20,
	StepsType_Bm_Single7 = 21,
	StepsType_Bm_Double7 = 22,
	StepsType_Maniax_Single = 23,
	StepsType_Maniax_Double = 24,
	StepsType_Techno_Single4 = 25,
	StepsType_Techno_Single5 = 26,
	StepsType_Techno_Single8 = 27,
	StepsType_Techno_Single9 = 28,
	StepsType_Techno_Double4 = 29,
	StepsType_Techno_Double5 = 30,
	StepsType_Techno_Double8 = 31,
	StepsType_Techno_Double9 = 32,
	StepsType_Pnm_Three = 33,
	StepsType_Pnm_Four = 34,
	StepsType_Pnm_Five = 35,
	StepsType_Pnm_Seven = 36,
	StepsType_Pnm_Nine = 37,
	StepsType_Pnm_Nine_Double = 38,
	StepsType_Gddm_Real = 39,
	StepsType_Gddm_New = 40,
	StepsType_Gddm_Old = 41,
	StepsType_Guitar_Five = 42,
	StepsType_Bass_Six = 43,
	StepsType_Guitar_Six = 44,
	StepsType_Guitar_Three = 45,
	StepsType_Bass_Four = 46,
	StepsType_Gh_Solo = 47,
	StepsType_Gh_Solo6 = 48,
	StepsType_Gh_Bass = 49,
	StepsType_Gh_Bass6 = 50,
	StepsType_Gh_Rhythm = 51,
	StepsType_Gh_Rhythm6 = 52,
	StepsType_Taiko = 53,
	StepsType_Lights_Cabinet = 54,
	StepsType_Kickbox_Human = 55,
	StepsType_Kickbox_Quadarm = 56,
	StepsType_Kickbox_Insect = 57,
	StepsType_Kickbox_Arachnid = 58,
}

declare enum TapNoteScore {
	TapNoteScore_None = 0,
	TapNoteScore_HitMine = 1,
	TapNoteScore_AvoidMine = 2,
	TapNoteScore_CheckpointMiss = 3,
	TapNoteScore_Miss = 4,
	TapNoteScore_W5 = 5,
	TapNoteScore_W4 = 6,
	TapNoteScore_W3 = 7,
	TapNoteScore_W2 = 8,
	TapNoteScore_W1 = 9,
	TapNoteScore_ProW5 = 10,
	TapNoteScore_ProW4 = 11,
	TapNoteScore_ProW3 = 12,
	TapNoteScore_ProW2 = 13,
	TapNoteScore_ProW1 = 14,
	TapNoteScore_MaxScore = 15,
	TapNoteScore_CheckpointHit = 16,
}

declare enum CoinMode {
	CoinMode_Home = 0,
	CoinMode_Pay = 1,
	CoinMode_Free = 2
}

declare enum EarnedExtraStage {
	EarnedExtraStage_No = 0,
	EarnedExtraStage_Extra1 = 1,
	EarnedExtraStage_Extra2 = 2,
}

declare enum Difficulty {
	Difficulty_Beginner = 0,
	Difficulty_Easy = 1,
	Difficulty_Medium = 2,
	Difficulty_Hard = 3,
	Difficulty_Challenge = 4,
	Difficulty_Edit = 5,
	Difficulty_D7 = 6,
	Difficulty_D8 = 7,
	Difficulty_D9 = 8,
	Difficulty_D10 = 9,
	Difficulty_D11 = 10,
	Difficulty_D12 = 11,
	Difficulty_D13 = 12,
	Difficulty_D14 = 13,
	Difficulty_D15 = 14,
}

declare enum Stage {
	Stage_No = 0,
	Stage_1st = 1,
	Stage_2nd = 2,
	Stage_3rd = 3,
	Stage_4th = 4,
	Stage_5th = 5,
	Stage_6th = 6,
	Stage_Next = 7,
	Stage_Final = 8,
	Stage_Extra1 = 9,
	Stage_Extra2 = 10,
	Stage_Nonstop = 11,
	Stage_Oni = 12,
	Stage_Endless = 13,
	Stage_Event = 14,
	Stage_Demo = 15,
}

declare enum MultiPlayer {
	MultiPlayer_P1 = 0,
	MultiPlayer_P2 = 1,
	MultiPlayer_P3 = 2,
	MultiPlayer_P4 = 3,
	MultiPlayer_P5 = 4,
	MultiPlayer_P6 = 5,
	MultiPlayer_P7 = 6,
	MultiPlayer_P8 = 7,
	MultiPlayer_P9 = 8,
	MultiPlayer_P10 = 9,
	MultiPlayer_P11 = 10,
	MultiPlayer_P12 = 11,
	MultiPlayer_P13 = 12,
	MultiPlayer_P14 = 13,
	MultiPlayer_P15 = 14,
	MultiPlayer_P16 = 15,
	MultiPlayer_P17 = 16,
	MultiPlayer_P18 = 17,
	MultiPlayer_P19 = 18,
	MultiPlayer_P20 = 19,
	MultiPlayer_P21 = 20,
	MultiPlayer_P22 = 21,
	MultiPlayer_P23 = 22,
	MultiPlayer_P24 = 23,
	MultiPlayer_P25 = 24,
	MultiPlayer_P26 = 25,
	MultiPlayer_P27 = 26,
	MultiPlayer_P28 = 27,
	MultiPlayer_P29 = 28,
	MultiPlayer_P30 = 29,
	MultiPlayer_P31 = 30,
	MultiPlayer_P32 = 31,
}

declare enum Premium {
	Premium_Off = 0,
	Premium_DoubleFor1Credit = 1,
	Premium_2PlayersFor1Credit = 2,
	Premium_1PBothAtOnceFor1Credit = 3,
}

declare enum ModsLevel {
	ModsLevel_Preferred = 0,
	ModsLevel_Stage = 1,
	ModsLevel_Song = 2,
	ModsLevel_Current = 3,
}

declare enum StageResult {
	StageResult_Win = 0,
	StageResult_Lose = 1,
	StageResult_Draw = 2,
}

declare enum Grade {
	Grade_Tier01 = 0,
	Grade_Tier02 = 1,
	Grade_Tier03 = 2,
	Grade_Tier04 = 3,
	Grade_Tier05 = 4,
	Grade_Tier06 = 5,
	Grade_Tier07 = 6,
	Grade_Tier08 = 7,
	Grade_Tier09 = 8,
	Grade_Tier10 = 9,
	Grade_Tier11 = 10,
	Grade_Tier12 = 11,
	Grade_Tier13 = 12,
	Grade_Tier14 = 13,
	Grade_Tier15 = 14,
	Grade_Tier16 = 15,
	Grade_Tier17 = 16,
	Grade_Tier18 = 17,
	Grade_Tier19 = 18,
	Grade_Tier20 = 19,
	Grade_Failed = 20,
}

declare enum NoteType {
	NoteType_4th = 0,
	NoteType_8th = 1,
	NoteType_12th = 2,
	NoteType_16th = 3,
	NoteType_24th = 4,
	NoteType_32nd = 5,
	NoteType_48th = 6,
	NoteType_64th = 7,
	NoteType_192nd = 8
}

declare enum HoldNoteScore {
	HoldNoteScore_None = 0,
	HoldNoteScore_LetGo = 1,
	HoldNoteScore_Held = 2,
	HoldNoteScore_MissedHold = 3,
}

declare enum PeakComboAward {
	PeakComboAward_1000 = 0,
	PeakComboAward_2000 = 1,
	PeakComboAward_3000 = 2,
	PeakComboAward_4000 = 3,
	PeakComboAward_5000 = 4,
	PeakComboAward_6000 = 5,
	PeakComboAward_7000 = 6,
	PeakComboAward_8000 = 7,
	PeakComboAward_9000 = 8,
	PeakComboAward_10000 = 9,
}

declare enum StageAward {
	StageAward_FullComboW3 = 0,
	StageAward_SingleDigitW3 = 1,
	StageAward_OneW3 = 2,
	StageAward_FullComboW2 = 3,
	StageAward_SingleDigitW2 = 4,
	StageAward_OneW2 = 5,
	StageAward_FullComboW1 = 6,
	StageAward_80PercentW3 = 7,
	StageAward_90PercentW3 = 8,
	StageAward_100PercentW3 = 9,
}

declare enum ColorType {
	ColorType_Red = 0,
	ColorType_Green = 1,
	ColorType_Blue = 2,
	ColorType_Alpha = 3
}

declare enum DrainType {
	DrainType_Normal = 0,
	DrainType_NoRecover = 1,
	DrainType_SuddenDeath = 2,
}

declare enum FailType {
	FailType_Immediate = 0,
	FailType_ImmediateContinue = 1,
	FailType_EndOfSong = 2,
	FailType_Off = 3,
}

declare enum LifeType {
	LifeType_Bar = 0,
	LifeType_Battery = 1,
	LifeType_Time = 2,
}

declare enum ModTimerType {
	ModTimerType_Game = 0,
	ModTimerType_Beat = 1,
	ModTimerType_Song = 2,
	ModTimerType_Default = 3,
}

declare enum ModSplineAxis {
	ModSplineAxis_X = 0,
	ModSplineAxis_Y = 1,
	ModSplineAxis_Z = 2,
	ModSplineAxis_RotX = 3,
	ModSplineAxis_RotY = 4,
	ModSplineAxis_RotZ = 5,
	ModSplineAxis_Zoom = 6,
	ModSplineAxis_SkewX = 7,
	ModSplineAxis_SkewY = 8,
	ModSplineAxis_Stealth = 9,
}

declare enum ModSplineType {
	ModSplineType_Linear = 0,
	ModSplineType_Cosine = 1,
	ModSplineType_Cubic = 2,
}

declare enum HealthState {
	HealthState_Hot = 0,
	HealthState_Alive = 1,
	HealthState_Danger = 2,
	HealthState_Dead = 3,
}

declare enum LayoutType {
	LayoutType_ShowAllInRow = 0,
	LayoutType_ShowOneInRow = 1
}

declare enum SelectType {
	SelectType_SelectOne = 0,
	SelectType_SelectMultiple = 1,
	SelectType_SelectNone = 2
}

declare enum WheelItemDataType {
	WheelItemDataType_Generic = 0,
	WheelItemDataType_Section = 1,
	WheelItemDataType_Song = 2,
	WheelItemDataType_Roulette = 3,
	WheelItemDataType_Random = 4,
	WheelItemDataType_Portal = 5,
	WheelItemDataType_Course = 6,
	WheelItemDataType_Sort = 7,
	WheelItemDataType_Custom = 8
}

declare enum PlayerController {
	PlayerController_Human = 0,
	PlayerController_Autoplay = 1,
	PlayerController_Cpu = 2,
}

declare enum RankingCategory {
	RankingCategory_a = 0,
	RankingCategory_b = 1,
	RankingCategory_c = 2,
	RankingCategory_d = 3,
}

declare enum GoalType {
	GoalType_Calories = 0,
	GoalType_Time = 1,
	GoalType_None = 2,
}

declare enum ProfileType {
	ProfileType_Guest = 0,
	ProfileType_Normal = 1,
	ProfileType_Test = 2,
}

declare enum ProfileSlot {
	ProfileSlot_Player1 = 0,
	ProfileSlot_Player2 = 1,
	ProfileSlot_Machine = 2,
}

declare enum ScreenType {
	ScreenType_Attract = 0,
	ScreenType_GameMenu = 1,
	ScreenType_Gameplay = 2,
	ScreenType_SystemMenu = 3,
}

declare enum CourseType {
	CourseType_Nonstop = 0,
	CourseType_Oni = 1,
	CourseType_Endless = 2,
	CourseType_Survival = 3,
}

declare enum DisplayBPM {
	DisplayBPM_Actual = 0,
	DisplayBPM_Specified = 1,
	DisplayBPM_Random = 2,
}

declare enum RadarCategory {
	RadarCategory_Stream = 0,
	RadarCategory_Voltage = 1,
	RadarCategory_Air = 2,
	RadarCategory_Freeze = 3,
	RadarCategory_Chaos = 4,
	RadarCategory_TapsAndHolds = 5,
	RadarCategory_Jumps = 6,
	RadarCategory_Holds = 7,
	RadarCategory_Mines = 8,
	RadarCategory_Hands = 9,
	RadarCategory_Rolls = 10,
	RadarCategory_Lifts = 11,
	RadarCategory_Fakes = 12,
}

declare enum StyleType {
	StyleType_OnePlayerOneSide = 0,
	StyleType_TwoPlayersTwoSides = 1,
	StyleType_OnePlayerTwoSides = 2,
	StyleType_TwoPlayersSharedSides = 3,
}

declare enum UnlockRequirement {
	UnlockRequirement_ArcadePoints = 0,
	UnlockRequirement_DancePoints = 1,
	UnlockRequirement_SongPoints = 2,
	UnlockRequirement_ExtraCleared = 3,
	UnlockRequirement_ExtraFailed = 4,
	UnlockRequirement_Toasties = 5,
	UnlockRequirement_StagesCleared = 6,
	UnlockRequirement_NumberUnlocked = 7,
}

declare enum UnlockRewardType {
	UnlockRewardType_Song = 0,
	UnlockRewardType_Steps = 1,
	UnlockRewardType_StepsType = 2,
	UnlockRewardType_Course = 3,
	UnlockRewardType_Modifier = 4,
}

declare enum AutosyncType {
	AutosyncType_Off = 0,
	AutosyncType_Song = 1,
	AutosyncType_Machine = 2,
	AutosyncType_Tempo = 3
}

declare enum SoundEffectType {
	SoundEffectType_Off = 0,
	SoundEffectType_Speed = 1,
	SoundEffectType_Pitch = 2,
	SoundEffectType_Both = 3,
}