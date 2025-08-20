import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "../assets";
import type { Token } from "./SwapPanel";
import { useClickOutside } from "../hooks";

type TokenSelectDropdownProps = {
  tokens?: Token[];
  selectedTokens?: Token;
  onSelectToken: (token: Token) => void;
};
export const TokenSelectDropdown: React.FC<TokenSelectDropdownProps> = ({
  tokens = [],
  selectedTokens,
  onSelectToken,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });

  const handleOptionSelect = (token: Token): void => {
    onSelectToken?.(token);
    setIsOpen(false);
  };

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="w-full bg-black rounded-lg px-4 py-3 text-left shadow-sm transition-all duration-200 flex flex-nowrap items-center justify-between space-x-2"
      >
        {selectedTokens?.currency ? (
          <div className="flex items-center space-x-2">
            <img
              src={`/tokens/${selectedTokens.currency}.svg`}
              className="rounded-full size-6"
              onError={(ev) => {
                ev.currentTarget.src =
                  "https://cdn.wow3.app/images/icon/token/default-nft.png/w=256"; // Fallback image
              }}
            />
            <span className="text-white text-xl">
              {selectedTokens.currency}
            </span>
          </div>
        ) : (
          <span className="text-gray-500 text-xl text-nowrap">
            Select Token
          </span>
        )}
        <ChevronDown
          className={`h-5 w-5 text-white transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute w-full mt-1 bg-black rounded-lg shadow-lg animate-in fade-in slide-in-from-top-2 duration-200 max-h-40 overflow-y-scroll z-50 border border-white/10">
          <div className="py-1">
            {tokens.map((token) => (
              <button
                key={`${token.currency}-${token.date}-${token.price}`}
                onClick={() => handleOptionSelect(token)}
                className="w-full flex items-center space-x-2 text-left px-4 py-2 bg-black hover:bg-gray-600 transition-colors first:rounded-t-lg last:rounded-b-lg"
              >
                <img
                  src={`/tokens/${token.currency}.svg`}
                  className="size-4 rounded-full"
                  onError={(ev) => {
                    ev.currentTarget.src =
                      "https://cdn.wow3.app/images/icon/token/default-nft.png/w=256"; // Fallback image
                  }}
                />
                <span>{token.currency}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
