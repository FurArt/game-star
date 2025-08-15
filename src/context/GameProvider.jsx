import { createContext, useReducer } from "react";
import gameReducer, { initialState } from "../store/gameReducer";

export const GameContext = createContext(null);
const { Provider } = GameContext;

function GameProvider({ children }) {
  const [state, dispatchGame] = useReducer(gameReducer, initialState);

  return (
    <Provider value={{ state, dispatchGame }}>
      {children}
    </Provider>
  );
}

export default GameProvider;
