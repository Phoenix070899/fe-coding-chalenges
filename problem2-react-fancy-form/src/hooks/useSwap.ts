import { useState } from "react";
import type { Token } from "./useTokens";

export type SwapDetail = Token & { amount: number | undefined };

export type Swap = {
  send: SwapDetail | undefined;
  receive: SwapDetail | undefined;
};

export function useSwap() {
  const [swapDetails, setSwapDetails] = useState<Swap>({
    send: undefined,
    receive: undefined,
  });

  const setInitialSwapDetails = (send: Token, receive: Token) => {
    setSwapDetails({
      send: { ...send, amount: undefined },
      receive: { ...receive, amount: undefined },
    });
  };

  const handleChangeToken = (type: "send" | "receive", receiveken: Token) => {
    if (type === "send") {
      setSwapDetails((prev) => ({
        ...prev,
        send: { ...receiveken, amount: undefined },
        receive: prev.receive
          ? { ...prev.receive, amount: undefined }
          : undefined,
      }));
    } else {
      setSwapDetails((prev) => ({
        ...prev,
        receive: { ...receiveken, amount: undefined },
        send: prev.send ? { ...prev.send, amount: undefined } : undefined,
      }));
    }
  };

  const handleChangeAmount = (type: "send" | "receive", amount: string) => {
    const amountValue = parseFloat(amount);

    if (!swapDetails.send || !swapDetails.receive) {
      return;
    }

    if (amountValue < 0) {
      return;
    }
    setSwapDetails((prev) => {
      if (!prev.send || !prev.receive) return prev;

      if (amountValue === 0) {
        return {
          ...prev,
          send: { ...prev.send, amount: undefined },
          receive: { ...prev.receive, amount: undefined },
        };
      }

      if (type === "send") {
        return {
          ...prev,
          send: { ...prev.send, amount: amountValue },
          receive: {
            ...prev.receive,
            amount: (amountValue * prev.send.price) / prev.receive.price,
          },
        };
      }

      if (type === "receive") {
        return {
          ...prev,
          receive: { ...prev.receive, amount: amountValue },
          send: {
            ...prev.send,
            amount: (amountValue * prev.receive.price) / prev.send.price,
          },
        };
      }

      return prev;
    });
  };

  const resetSwapDetails = () => {
    setSwapDetails((prev) => ({
      send: prev.send ? { ...prev.send, amount: undefined } : undefined,
      receive: prev.receive
        ? { ...prev.receive, amount: undefined }
        : undefined,
    }));
  };

  const swapSendAndReceive = () => {
    setSwapDetails((prev) => ({
      send: prev.receive,
      receive: prev.send,
    }));
  };

  return {
    swapDetails,
    setInitialSwapDetails,
    swapSendAndReceive,
    handleChangeToken,
    handleChangeAmount,
    resetSwapDetails,
  };
}
