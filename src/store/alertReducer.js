export const initialStateAlert = {
  open: false,
  message: "",
  variant: "info",
};

export function alertReducer(state, action) {
  switch (action.type) {
    case "SHOW": {
      const message = action.payload ?? "";
      const variant = action.variant ?? "info";
      return { ...state, open: true, message, variant };
    }
    case "HIDE": {
      return { ...state, open: false };
    }
    case "CLEAR": {
      return { ...initialStateAlert };
    }
    default:
      return state;
  }
}