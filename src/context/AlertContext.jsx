import { createContext, useReducer } from "react";
import { alertReducer, initialStateAlert } from "../store/alertReducer";

export const AlertContext = createContext(null);

const { Provider } = AlertContext;

const AlertProvider = ({ children }) => {
  const [alertState, dispatchAlert] = useReducer(alertReducer, initialStateAlert);

  return <Provider value={{ alertState, dispatchAlert }}>{children}</Provider>;
};

export default AlertProvider;

