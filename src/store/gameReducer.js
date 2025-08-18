export const initialState = {
  wallet: 0,
  stopGame: false,
  multiplication: 1,
  stats: {
    cash: 5,
    multiply: 1,
    zero: 1,
    bomb: 1,
    stop: 1,
  },
};


export default function gameReducer(state, action) {
  switch (action.type) {
    case "SET_WALLET":
      return { ...state, wallet: action.payload };

    case "SET_STOP_GAME":
      return { ...state, stopGame: action.payload };

    case "SET_MULTIPLICATION":
      return { ...state, multiplication: action.payload };

    case "SET_STATS":
      return { ...state, stats: action.payload };

    case "UPDATE_STAT":
      return {
        ...state,
        stats: {
          ...state.stats,
          [action.payload.key]: action.payload.value
        }
      };

    case "RESET_GAME":
      return initialState;

    default:
      return state;
  }
}

