import { TokenSelectDropdown } from "./TokenSelectDropdown";

export type Token = {
  currency: string;
  date: string;
  price: number;
};

type SwapPanelProps = {
  title?: string;
  onChangeToken: (token: Token) => void;
  onChangeAmount: (amount: string) => void;
  className?: string;
  token?: Token & { amount?: number };
  tokens?: Token[];
  balance?: number;
  loading?: boolean;
};

function abbreviateNumber(value: number, decPlaces = 2) {
  if (Math.abs(value) < 1_000_000) {
    return value.toFixed(decPlaces);
  }
  const suffixes = ["M", "B", "T"];
  const tier = Math.floor(Math.log10(Math.abs(value)) / 3) - 2;
  const suffix = suffixes[tier] || "";
  const scale = Math.pow(10, (tier + 2) * 3);
  const scaledValue = value / scale;
  return scaledValue.toFixed(decPlaces) + suffix;
}

export const SwapPanel = ({
  title = "Send",
  onChangeAmount,
  className = "",
  onChangeToken,
  token,
  tokens = [],
  balance,
  loading = false,
}: SwapPanelProps) => {
  if (loading) {
    return <SwapPanelLoading title={title} />;
  }

  return (
    <div
      className={`w-full flex flex-col justify-center p-6 rounded-xl backdrop-blur-md bg-black/30 space-y-2 relative ${className}`}
    >
      <div className="flex items-center justify-between">
        <h3>{title}</h3>
        {balance && token?.currency && (
          <p>
            Balance: {balance} {token.currency}
          </p>
        )}
      </div>
      <div className="flex flex-col md:flex-row space-y-2 md:space-x-2 md:space-y-0">
        <TokenSelectDropdown
          onSelectToken={onChangeToken}
          selectedTokens={token}
          tokens={tokens}
        />

        {token?.currency && (
          <div className="w-full flex-1 flex md:flex-col items-end justify-between gap-4 md:gap-0">
            <div className="flex-1">
              <input
                type="number"
                className="text-3xl w-full text-white text-left md:text-right font-bold"
                placeholder="0.00"
                value={token.amount || ""}
                onChange={(e) =>
                  onChangeAmount && onChangeAmount(e.target.value)
                }
              />
            </div>
            <span className="text-white text-sm text-right">
              {token.amount
                ? `${abbreviateNumber(Number(token.amount) * token.price)}`
                : "$0"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export const SwapPanelLoading = ({ title = "" }: { title?: string }) => {
  return (
    <div className="w-full flex flex-col justify-center p-6 rounded-xl backdrop-blur-md bg-black/30 space-y-2">
      <div className="flex items-center justify-between">
        <h3>{title}</h3>
      </div>
      <div className="flex flex-col md:flex-row space-y-2 md:space-x-2 md:space-y-0">
        <div className="w-full bg-black/50 h-14 rounded-lg animate-pulse" />
        <div className="w-full bg-black/50 h-14 rounded-lg animate-pulse" />
      </div>
    </div>
  );
};
