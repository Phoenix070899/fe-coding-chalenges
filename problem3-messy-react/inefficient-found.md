```tsx
// Missing blockchain field
interface WalletBalance {
  currency: string;
  amount: number;
}

// FormattedWalletBalance Should extend from WalletBalance
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

// Just use BoxProps and remove this
interface Props extends BoxProps {}

// Replace with BoxProps, remove Props type next to props
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // Don't use any, instead use string for type safety
  // Move to outside of React component to avoid re-render
  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const rows = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        // Wrong variable name, use && for conditinal instead of nested if
        // Asign condition for a naming variable for better readibility
        if (lhsPriority > -99) {
          if (balance.amount <= 0) {
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);

        // Return rightPriority - leftPriority

        if (leftPriority > rightPriority) {
          return -1;

          // Remove else if
        } else if (rightPriority > leftPriority) {
          return 1;
        }
      });

    // Remove prices from dependency list or keep if corporate with rows
  }, [balances, prices]);

  // Remove this if it wont be used
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });

  // Wrap this in useMemo with sortedBalances used as dependency or
  // Corporate this with sortedBalance if sortedBalance is not gonna use anywhere else
  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
```
