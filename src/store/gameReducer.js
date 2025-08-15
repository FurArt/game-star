export const initialState = {
  wallet: 0,
  stopGame: false,
  multiplication: 1,
};

export default function gameReducer(state, action) {
  switch (action.type) {
    case "SET_WALLET":
      return { ...state, wallet: action.payload };
    case "SET_STOP_GAME":
      return { ...state, stopGame: action.payload };
    case "SET_MULTIPLICATION":
      return { ...state, multiplication: action.payload };
    case "RESET_GAME":
      return initialState;
    default:
      return state;
  }
}
