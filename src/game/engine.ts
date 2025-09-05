export interface GameState {
  chapterIndex: number;
  sceneIndex: number;
  pp: number;
  branchKey: string;
}

export function applyChoice(state: GameState, option: { goto?: number; pp_delta: number }): GameState {
  return {
    ...state,
    pp: state.pp + option.pp_delta,
    sceneIndex: option.goto ?? state.sceneIndex + 1
  };
}

export function triggerPrewarm(_state: GameState) {
  // placeholder for background pre-warm logic
}
