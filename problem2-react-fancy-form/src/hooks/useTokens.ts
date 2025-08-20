import { useEffect, useState } from "react";
import { delay } from "../utils";

export type Token = {
  currency: string;
  date: string;
  price: number;
};

type UseTokensProps = {
  setInitialTokens?: (sendToken: Token, receiveToken: Token) => void;
};

export function useTokens({ setInitialTokens }: UseTokensProps) {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getListTokens = async () => {
      setLoading(true);
      setError(null);
      try {
        await delay(1000);
        const response = await fetch("/tokens.json");
        if (!response.ok) throw new Error("Network response was not ok");
        const data: Token[] = await response.json();
        setTokens(data);

        if (data.length >= 2 && setInitialTokens) {
          setInitialTokens(data[0], data[1]);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError("Failed to load tokens");
      } finally {
        setLoading(false);
      }
    };
    getListTokens();
  }, []);

  return { tokens, loading, error };
}
