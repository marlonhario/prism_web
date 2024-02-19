import CurrencyFormat from 'react-currency-format';

export const formatPrice = (price: number) => {
  return (
    <CurrencyFormat
      value={price}
      displayType={"text"}
      thousandSeparator={true}
      prefix={"$"}
      decimalScale={2}
      fixedDecimalScale={true}
    />
  );
}

