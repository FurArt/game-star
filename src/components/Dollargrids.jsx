import React, { useState, useEffect, useContext, useRef } from "react";
import itemsGrid from "../api/api";
import { GameContext } from "../context/GameProvider";
import WalletDisplay from "../components/WalletDisplay";
import { motion } from "framer-motion";


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

  const [flyItem, setFlyItem] = useState(null);
  const walletRef = useRef(null);


  useEffect(() => {
    setNumbers(generateShuffledArray());
  }, []);

  const handleClick = (index, item) => {
    if (revealed[index]) return;

    setRevealed((prev) => {
      const updated = [...prev];
      updated[index] = true;

      if (item.stop && item.value === 0) {
        return updated.map(() => true);
      }

      return updated;
    });

    if (item.stop && item.value === 0) {
      dispatchGame({ type: "SET_STOP_GAME", payload: true });
      return;
    }

    if (item.multiplication === 2) {
      const { wallet, multiplication } = state;
      const newWallet = wallet * 2;
      const newMultiplication = multiplication * 2;

      dispatchGame({ type: "SET_WALLET", payload: newWallet });
      dispatchGame({ type: "SET_MULTIPLICATION", payload: newMultiplication });
      return;
    }

    if (item.value > 0) {
      dispatchGame({
        type: "SET_WALLET",
        payload: state.wallet + item.value * state.multiplication,
      });
      return;
    }

    if (item.value === 0) {
      dispatchGame({ type: "SET_WALLET", payload: 0 });
      return;
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <WalletDisplay />
        <div className="grid grid-cols-3 gap-3 p-4">
          {numbers.map((num, index) => {
            const isRevealed = revealed[index];
            const frontImage = itemsGrid[num].path;
            const backImage = "/images/Items-back.png";

            return (
              <motion.div
                key={index}
                onClick={() => handleClick(index, itemsGrid[num])}
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
      </div>
    </>
  );
};

export default DollarGrid;
