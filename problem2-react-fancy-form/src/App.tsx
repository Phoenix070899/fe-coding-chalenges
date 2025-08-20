import { useMemo } from "react";
import { SwapButton, SwapPanel, SwapPanelLoading } from "./components";
import { useSwap, useTokens } from "./hooks";

import "./App.css";
import { SwapIcon } from "./assets";

function App() {
  const {
    swapDetails,
    setInitialSwapDetails,
    handleChangeAmount,
    handleChangeToken,
    resetSwapDetails,
    swapSendAndReceive,
  } = useSwap();
  const { tokens, loading, error } = useTokens({
    setInitialTokens: setInitialSwapDetails,
  });

  const tokenBalance = useMemo(() => {
    return Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
  }, [swapDetails.send?.currency]);

  if (error) {
    return (
      <main
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1614854262174-83f27c0cf3ab?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        className="flex flex-col items-center justify-center h-dvh p-4"
      >
        <div className="relative w-full max-w-2xl space-y-8">
          <p className="text-2xl text-center font-bold">{error}</p>
          <SwapPanelLoading />
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1614854262174-83f27c0cf3ab?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
      className="flex flex-col items-center justify-center h-dvh p-4"
    >
      <h5 className="text-3xl font-bold text-center mb-6">Swap</h5>
      <div className="relative w-full max-w-2xl space-y-2">
        <SwapPanel
          className="z-10"
          onChangeToken={(token) => handleChangeToken("send", token)}
          onChangeAmount={(amount) => handleChangeAmount("send", amount)}
          token={swapDetails.send}
          tokens={tokens}
          balance={tokenBalance}
          loading={loading}
        />
        <SwapPanel
          title="Recive"
          onChangeToken={(token) => handleChangeToken("receive", token)}
          onChangeAmount={(amount) => handleChangeAmount("receive", amount)}
          token={swapDetails.receive}
          tokens={tokens}
          loading={loading}
        />
        <button
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black p-2 rounded-full z-20"
          onClick={swapSendAndReceive}
        >
          <SwapIcon className="size-5" />
        </button>
      </div>
      <SwapButton
        swapDetails={swapDetails}
        balance={tokenBalance}
        resetSwapDetails={resetSwapDetails}
        loading={loading}
      />
    </main>
  );
}

export default App;
