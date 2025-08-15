import React, { useContext } from "react";
import { GameContext } from "../context/GameProvider";
import { AlertContext } from "../context/AlertContext";

// Hook for accessing game state & dispatcher
export const useGame = () => {
  const {
    state: { wallet, stopGame, multiplication },
    dispatchGame,
  } = useContext(GameContext);

  return { wallet, stopGame, multiplication, dispatchGame };
};

// Hook for loading/error states (if you have them in GameContext)
export const useAppState = () => {
  const {
    state: { isLoading, isError },
  } = useContext(GameContext);
  return { isLoading, isError };
};

// Hook for alerts
export const useAlert = () => {
  const { alertState, dispatchAlert } = useContext(AlertContext);

  return { alertState, dispatchAlert };
};

export default function Hook() {
  return null;
}
