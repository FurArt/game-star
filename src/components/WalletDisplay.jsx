import React, { forwardRef } from "react";
import { useGame } from "../hooks/Hooks";

const formatWallet = (value) => {
  const num = Number(value);
  if (!Number.isFinite(num)) return "0";
  const abs = Math.abs(num);
  if (abs >= 1000000) return (num / 1000000).toFixed(1).replace(/\.0$/, '') + "M";
  if (abs >= 1000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + "K";
  return num.toString();
};

const WalletDisplay = forwardRef(function WalletDisplay(props, ref) {
  const { wallet } = useGame();

  return (
    <div ref={ref} className="flex items-center gap-2 text-xl font-bold text-white px-4 py-2 rounded">
      <img src={`${import.meta.env.BASE_URL}images/cash.png`} alt="cash" className="w-6 h-6" />
      {formatWallet(wallet)}
    </div>
  );
});
export default WalletDisplay;
