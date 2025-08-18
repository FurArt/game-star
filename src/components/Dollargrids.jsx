import React, { useState, useEffect, useContext, useRef } from "react";
import itemsGrid from "../api/api";
import { GameContext } from "../context/GameProvider";
import WalletDisplay from "../components/WalletDisplay";
import { motion } from "framer-motion";
import FlyingCash from "./FlyingCash";
import GameFooter from "./GameFooter";
import { AlertContext } from "../context/AlertContext";

function generateShuffledArray() {
  const arr = Array.from({ length: 9 }, (_, i) => i + 1);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const DollarGrid = () => {
  const [numbers, setNumbers] = useState([]);
  const [revealed, setRevealed] = useState(Array(9).fill(false));
  const { state, dispatchGame } = useContext(GameContext);
  const { alertState, dispatchAlert } = useContext(AlertContext);

  const [showCash, setShowCash] = useState(false);
  const [cashOriginRect, setCashOriginRect] = useState(null);
  const walletRef = useRef(null);

  useEffect(() => {
    if (state.stopGame) {
      setRevealed(Array(9).fill(false));
    }
  }, [state.stopGame]);

  useEffect(() => {
    setNumbers(generateShuffledArray());
  }, []);

  const handleClick = (e, index, item) => {
    if (revealed[index]) return;

    setRevealed((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });

    switch (item.type) {
      case "stop": {
        dispatchGame({ type: "SET_STOP_GAME", payload: true });
        dispatchGame({
          type: "UPDATE_STAT",
          payload: { key: "stop", value: state.stats.stop - 1 },
        });
        dispatchAlert({
          type: "SHOW",
          payload: "Game stopped! You hit a stop card.",
          variant: "warning",
        });

        return;
      }

      case "multiplier": {
        const { wallet, multiplication } = state;
        const newWallet = wallet * (item.multiplication || 1);
        const newMultiplication = multiplication * (item.multiplication || 1);

        dispatchGame({ type: "SET_WALLET", payload: newWallet });
        dispatchGame({
          type: "SET_MULTIPLICATION",
          payload: newMultiplication,
        });
        dispatchGame({
          type: "UPDATE_STAT",
          payload: { key: "multiply", value: state.stats.multiply - 1 },
        });
        return;
      }

      case "cash": {
        if (typeof window !== "undefined" && e?.currentTarget) {
          const rect = e.currentTarget.getBoundingClientRect();
          setCashOriginRect(rect);
        }

        dispatchGame({
          type: "SET_WALLET",
          payload: state.wallet + (item.value || 0) * state.multiplication,
        });

        dispatchGame({
          type: "UPDATE_STAT",
          payload: { key: "cash", value: state.stats.cash - 1 },
        });

        setShowCash(true);
        return;
      }

      case "empty": {
        dispatchGame({ type: "SET_WALLET", payload: 0 });
        dispatchGame({
          type: "UPDATE_STAT",
          payload: { key: "zero", value: state.stats.zero - 1 },
        });
        return;
      }

      case "bomb": {
        dispatchGame({
          type: "UPDATE_STAT",
          payload: { key: "bomb", value: state.stats.bomb - 1 },
        });
        setRevealed(new Array(9).fill(true));
        return;
      }

      default: {
        return;
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center   relative">
        <WalletDisplay ref={walletRef} />
        <div className="grid grid-cols-3 gap-2 p-4 ">
          {numbers.map((num, index) => {
            const isRevealed = revealed[index];
            const item = itemsGrid[num];
            const frontImage = item.path;
            const backImage = `${import.meta.env.BASE_URL}images/Items-back.png`;

            return (
              <motion.div
                key={index}
                onClick={(e) => handleClick(e, index, item)}
                className={`w-[113px] h-[113px] rounded-xl cursor-pointer perspective cell-${index}`}
              >
                <motion.div
                  className="relative w-full h-full"
                  animate={{ rotateY: isRevealed ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="absolute inset-0 bg-center bg-no-repeat rounded-xl"
                    style={{
                      backgroundImage: `url(${frontImage})`,
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                    }}
                  />
                  <div
                    className="absolute inset-0 bg-center bg-no-repeat rounded-xl"
                    style={{
                      backgroundImage: `url(${backImage})`,
                      backfaceVisibility: "hidden",
                    }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {showCash && cashOriginRect && (
          <FlyingCash
            originRect={cashOriginRect}
            targetRef={walletRef}
            onComplete={() => setShowCash(false)}
          />
        )}

        <GameFooter />
      </div>
    </>
  );
};

export default DollarGrid;
