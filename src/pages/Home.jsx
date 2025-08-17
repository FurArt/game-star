import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGame } from "../hooks/Hooks";
import DollarGrid from "../components/Dollargrids";
import WalletDisplay from "../components/WalletDisplay";

export const Home = () => {
  const { wallet, stopGame, multiplication, dispatchGame } = useGame();
  useEffect(() => {
  }, [wallet])
  return (
    <>
      <div
        className="
          w-full min-h-screen 
          bg-cover bg-center bg-no-repeat
          md:bg-cover 
          xl:bg-fixed 
        "
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/Bg.svg)` }}
      >
        <DollarGrid />
      </div>
    </>
  );
};

export default Home;
