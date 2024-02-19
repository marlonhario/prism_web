import { map } from 'lodash';
import { MarketsAlphabetProps } from './MarketsAlphabet.props';
import cn from 'classnames';

const MarketsAlphabetView: React.FC<MarketsAlphabetProps> = (
  props: MarketsAlphabetProps
) => {
  const alphabets = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];

  return (
    <div className="hidden w-[5%] h-full xl:flex flex-col">
      <div
        className={cn(
          'flex h-[51px] justify-center text-white py-2 cursor-pointer',
          props.allShown ? '' : 'markets-table-header'
        )}
        onClick={() => props.sortSecurities('ticker', 'asc')}
      >
        <div
          className={cn(
            'w-full flex items-center justify-center border-solid border-[#4B5059] font-din2014 uppercase tracking-widest text-[9px]',
            props.allShown ? 'border-0' : 'border-r'
          )}
        >
          A-Z
        </div>
      </div>
      {map(alphabets, (alphabet) => (
        <div
          className={cn(
            'flex-1 flex flex-col justify-center items-center markets-alphabet font-din2014 font-semibold text-xs',
            props.allShown
              ? 'cursor-not-allowed text-[#343741]'
              : 'cursor-pointer text-white'
          )}
          key={alphabet}
          onClick={() => props.onHandleLetterClick(alphabet)}
        >
          {alphabet}
        </div>
      ))}
    </div>
  );
};

export default MarketsAlphabetView;
