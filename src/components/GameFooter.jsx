import { useContext } from "react";
import ClaimButton from "./ClaimButton";
import { GameContext } from "../context/GameProvider";

export default function GameFooter() {
  const { state } = useContext(GameContext);
  const { stats } = state;
  const iconFooter = {
    cash: `${import.meta.env.BASE_URL}images/icon/cash-small.svg`,
    bomb: `${import.meta.env.BASE_URL}images/icon/bomb-img.svg`,
    empty: `${import.meta.env.BASE_URL}images/icon/icon-null.svg`,
    stop: `${import.meta.env.BASE_URL}images/icon/stop-icon.svg`,
    multipl: `${import.meta.env.BASE_URL}images/icon/x2.svg`,
  }
  return (
    <div className="
      w-[386px]  
      text-white 
      p-4 
      rounded-t-2xl 
      flex-column
      items-center 
    ">
      <div className="flex justify-around items-center mb-3">
        <div className="flex items-center gap-1">
          <span className="text-xl w-[32px] h-[32px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${iconFooter.cash})`,
            }}
          ></span>
          <span className="text-sm font-medium">{stats.cash}</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-xl w-[32px] h-[32px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${iconFooter.multipl})`,
            }}
          ></span>
          <span className="text-sm font-medium">{stats.multiply}</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-xl w-[32px] h-[32px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${iconFooter.empty})`,
            }}
          ></span>
          <span className="text-sm font-medium">{stats.zero}</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-xl w-[32px] h-[32px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${iconFooter.bomb})`,
            }}
          ></span>
          <span className="text-sm font-medium">{stats.bomb}</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-xl w-[32px] h-[32px] bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${iconFooter.stop})`,
            }}
          ></span>
          <span className="text-sm font-medium">{stats.stop}</span>
        </div>
      </div>

      <ClaimButton />
    </div>
  );
}
