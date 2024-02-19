import React from 'react';

const SecurityLogoView: React.FC<
  {
    defaultSrc?: string;
    longName: string;
    region: string;
    ticker: string;
  } & React.HtmlHTMLAttributes<HTMLImageElement>
> = ({
  defaultSrc = '/logos/logoPending.svg',
  longName,
  region,
  ticker,
  ...props
}) => {
  return (
    <img
      alt={longName}
      src={`/logos/${region}/${ticker}.svg`}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null;
        currentTarget.classList.remove('logo-white')
        currentTarget.src = defaultSrc;
      }}
      {...props}
    />
  );
};

export default SecurityLogoView;
