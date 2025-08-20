import { useMemo, useState } from "react";
import type { Swap } from "../hooks";
import { delay } from "../utils";

type SwapButtonProps = {
  swapDetails: Swap;
  resetSwapDetails?: () => void;
  balance?: number;
  loading?: boolean;
};

const ERROR_MESSAGES = {
  missingToken: "Please select both fields",
  missingAmount: "Please enter an amount",
  insufficientBalance: "Insufficient balance",
};

export const SwapButton = ({
  swapDetails,
  balance = 0,
  resetSwapDetails,
  loading = false,
}: SwapButtonProps) => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const error = useMemo(() => {
    if (!swapDetails.send || !swapDetails.receive) {
      return ERROR_MESSAGES.missingToken;
    }
    if (swapDetails.send.amount && swapDetails.send.amount > balance) {
      return ERROR_MESSAGES.insufficientBalance;
    }
    if (!swapDetails.send.amount || swapDetails.send.amount <= 0) {
      return ERROR_MESSAGES.missingAmount;
    }
    return null;
  }, [
    swapDetails.receive?.currency,
    swapDetails.send?.currency,
    swapDetails.send?.amount,
    balance,
  ]);

  if (loading || buttonLoading) {
    return (
      <button
        className="w-full !cursor-not-allowed max-w-2xl h-16 bg-black/50 text-white rounded-xl !mt-2 text-lg font-bold hover:bg-gray-600 transition-colors"
        disabled
      >
        Loading...
      </button>
    );
  }

  if (error) {
    return (
      <button
        className="w-full !cursor-not-allowed max-w-2xl h-16 bg-red-900/70 text-white rounded-xl !mt-2 text-lg font-bold hover:bg-red-900/50 transition-colors"
        disabled
      >
        {error}
      </button>
    );
  }

  const handleConfirmSwap = async () => {
    setButtonLoading(true);
    await delay(1000);
    setButtonLoading(false);
    alert("Swap confirmed!");
    resetSwapDetails?.();
  };

  return (
    <button
      className="w-full max-w-2xl h-16 bg-black/50 rounded-xl !mt-2 text-lg font-bold hover:bg-black/70 transition-colors"
      onClick={handleConfirmSwap}
    >
      Confirm Swap
    </button>
  );
};
