import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { Nullable } from 'common/types';

const CurrencyText = ({
  decimalScale = 2,
  symbol = '$',
  value = 0,
  ...props
}: {
  decimalScale?: number;
  symbol?: Nullable<string>;
  value: number;
} & Omit<React.ComponentProps<typeof CurrencyFormat>, 'displayType'>) => {
  return (
    <CurrencyFormat
      {...{ decimalScale, value }}
      {...props}
      displayType="text"
      prefix={symbol || ''}
      fixedDecimalScale={decimalScale > 0}
      thousandSeparator
    />
  );
};

export default CurrencyText;
