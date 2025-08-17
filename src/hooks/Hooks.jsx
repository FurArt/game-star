import React, { useContext } from "react";
import { GameContext } from "../context/GameProvider";
import { AlertContext } from "../context/AlertContext";

export const useGame = () => {
  const {
    state: { wallet, stopGame, multiplication },
    dispatchGame,
  } = useContext(GameContext);

  return { wallet, stopGame, multiplication, dispatchGame };
};

export const useAppState = () => {
  const {
    state: { isLoading, isError },
  } = useContext(GameContext);
  return { isLoading, isError };
};

export const useAlert = () => {
  const { alertState, dispatchAlert } = useContext(AlertContext);

  return { alertState, dispatchAlert };
};

export default function Hook() {
  return null;
}
