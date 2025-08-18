import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGame } from "../hooks/Hooks";
import DollarGrid from "../components/Dollargrids";
import WalletDisplay from "../components/WalletDisplay";
import GameFooter from "../components/GameFooter";

export const Home = () => {
  const {
    wallet,
    stopGame,
    multiplication,
    dispatchGame,
  } = useGame();
  useEffect(() => { }, [wallet]);
  return (
    <>
      <div
        className="
    relative
    w-full min-h-screen
    bg-[radial-gradient(102.36%_100%_at_50%_0%,_#9955FF_0%,_#181A20_100%)]

    before:content-[''] before:absolute before:top-0 before:left-0
    before:block before:w-full before:h-[50vh]
    before:[background-image:var(--star-bg)]  before:bg-repeat-x
    before:pointer-events-none
  "
        style={{
          '--star-bg': `url(${import.meta.env.BASE_URL}images/pattern.svg)`,
        }}
      >
        <div className="flex items-center justify-center w-full pt-12 ">
          <img src={`${import.meta.env.BASE_URL}images/white-green-logo.png`} alt="Roll Craft logo" className="h-8 w-auto" />
        </div>
        <div className="flex items-center justify-center w-full my-4 pt-14">

          <div className=" border-t border-white-800 opacity-40 w-[126px] "></div>
          <span className="px-4 text-lg font-bold text-white">
            Roll Craft
          </span>
          <div className="border-t border-white-800 opacity-40 w-[126px]"></div>
        </div>
        <DollarGrid />
      </div>
    </>
  );
};

export default Home;
