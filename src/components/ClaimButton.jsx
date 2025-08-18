import * as React from 'react';
import { AlertDialog } from '@base-ui-components/react/alert-dialog';
import WalletDisplay from './WalletDisplay';
import { GameContext } from '../context/GameProvider';
import { initialState } from '../store/gameReducer';
import { AlertContext } from '../context/AlertContext';

export default function ClaimButton({
  triggerLabel = 'Claim',
  title = 'Game over!',
  description = [" You've reached the end of this run...", "...claim and return to the main board"],
  cancelLabel = 'Claim',
  triggerClassName = [
    'inline-flex items-center justify-center rounded-md m-auto',
    'px-4 py-2 text-sm font-semibold text-white shadow-sm m-auto h-[48px]',
    'bg-gradient-to-t from-[#498013] to-[#6DBF1D]',
    'hover:bg-[linear-gradient(180deg,_#76CF20_0%,_#4E8A14_100%)] m-auto',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 m-auto w-[80%]',
    'transition-colors',
    'disabled:bg-none',
    'disabled:border-2 disabled:border-dashed disabled:border-gray-500',
    'disabled:text-white/80',
    'disabled:cursor-not-allowed',
    'disabled:opacity-60',
    'disabled:hover:bg-gray-500',
  ],
  isClaim = false,
}) {
  const { state, dispatchGame } = React.useContext(GameContext);
  const { alertState, dispatchAlert } = React.useContext(AlertContext);
  const walletAmount = Number(
    state?.wallet ?? gameState?.balance ?? 0
  );
  const isDisabled = isClaim || walletAmount <= 0;

  const handleReset = () => {
    dispatchGame({ type: "RESET_GAME" });
    dispatchAlert({ type: "HIDE" })

  };

  const handleClaim = () => {
    console.log(isClaim);
    dispatchGame({ type: "SET_STOP_GAME", payload: true });
    dispatchAlert({ type: "SHOW" })

  };


  return (
    <div className="flex justify-center">
      <AlertDialog.Root open={alertState?.open}>
        <AlertDialog.Trigger
          type="button"
          className={triggerClassName.join(' ')}
          onClick={handleClaim}
          disabled={isDisabled}
          aria-disabled={isDisabled}
        >
          {triggerLabel}
        </AlertDialog.Trigger>

        <AlertDialog.Portal>

          <AlertDialog.Backdrop className="fixed inset-0 z-40 bg-black opacity-80 flex-col justify-center h-full" />

          <AlertDialog.Popup
            className={[
              'fixed left-1/2 top-[2%] z-50 w-[92vw] max-w-md -translate-x-1/2',
              'focus:outline-none',
            ].join(' ')}
          >
            <div className="p-6 flex flex-col items-center text-center relative">

              <img
                src={`${import.meta.env.BASE_URL}images/white-green-logo.png`}
                alt="Roll Craft logo"

              />

              <AlertDialog.Title
                className="
                  text-lg
                  font-semibold
                  text-white
                  drop-shadow-[0_0_9px_#FFFFFF]
                  fs-24
                ">
                {title}
              </AlertDialog.Title>

              <AlertDialog.Description className="mt-2 text-sm text-white/80 relative">
                {description[0]}
                <img
                  src={`${import.meta.env.BASE_URL}images/stop-modal.svg`}
                  alt={title}
                  className='absolute w-[360px] max-w-none top-[120px] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1] opacity-95'
                />
                <div className='absolute top-[175px] left-1/2 -translate-x-1/2 -translate-y-1/2'>

                  <WalletDisplay />
                </div>
              </AlertDialog.Description>
              <AlertDialog.Description className="mt-[200px] text-sm text-white/80">
                {description[1]}
              </AlertDialog.Description>

              <div className="mt-6 flex w-full items-center gap-3">
                <AlertDialog.Close
                  type="button"
                  autoFocus
                  className={triggerClassName.join(' ')}
                  onClick={handleReset}
                >
                  {cancelLabel}
                </AlertDialog.Close>


              </div>
            </div>
          </AlertDialog.Popup>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
}
