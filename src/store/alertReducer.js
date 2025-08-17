export const initialState = {
  show: false,
  message: "",
  variant: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return {
        show: true,
        message: action.payload,
        variant: action.variant,
      };
    case "HIDE":
      return {
        show: false,
        message: "",
        variant: "",
      };
        default:
      return state;
  }
};

export default reducer