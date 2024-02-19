interface Props {
  first: string;
  second: string;
  superscript?: string;
  highlight?: boolean;
  onClick?(): void;
}

export function Typography({
  first,
  second,
  superscript,
  highlight,
  onClick
}: Props) {

  return (
    <div
      className={`cursor-pointer transition-colors ${highlight ? 'text-white' : 'text-[#C0C1C6]'} hover:text-white`}
      onClick={onClick}
    >
      <span className="text-[27px]">
        <span
          className={`font-extrabold ${highlight ? 'eta-text-shadow' : ''
            }`}
        >
          {first}
        </span>
        <span
          className={`font-normal ${highlight ? 'eta-text-shadow' : ''
            }`}
        >
          {second}
        </span>
      </span>
      <sup
        className={`font-bold text-base ${highlight ? 'eta-text-shadow' : ''
          }`}
      >
        {superscript || 'ETA'}
      </sup>
    </div>
  )
}