import { CustomShareFormProps } from './CustomShare.props';
import './styles.scss';

const CURRENCIES = ['AUD', 'USD', 'GBP', 'EUR'];

const CustomShareFormView: React.FC<CustomShareFormProps> = (
  props: CustomShareFormProps
) => {
  return (
    <div className="bg-black w-full flex flex-row ltr py-5 justify-evenly items-center">
      <div className="text-4xl text-white uppercase font-bold example-eta">
        Example ETA
      </div>
      <div className="flex items-center gap-x-2 max-w-[250px] relative">
        <span className="uppercase font-dinCondensed text-2xl last-price">
          Last Price:
        </span>
        <input
          className="bg-transparent white custom-share-input border-0 border-b text-base w-32 pr-14"
          type="number"
          name="lastPrice"
          min="0"
          value={props.underlyingShareForm}
          defaultValue="100"
          onChange={(e) => {
            props.setUnderlyingShareForm(e.target.valueAsNumber);
          }}
        />
        <input
          className="white custom-share-input-mobile border-b text-base w-32 pr-9 pl-2 text-black"
          type="number"
          name="lastPrice"
          min="0"
          placeholder="Last Price"
          value={props.underlyingShareForm}
          defaultValue="100"
          onChange={(e) => {
            props.setUnderlyingShareForm(e.target.valueAsNumber);
          }}
        />
        <select
          name="currency"
          className="text-base text-white absolute right-0 w-[65px] pr-0 m-0 bg-transparent outline-none border-0 font-semibold aud-text"
          value={props.currency}
          onChange={(e) => {
            props.setCurrency(e.target.value);
          }}
        >
          {CURRENCIES.map((currency) => (
            <option value={currency} className="bg-black" key={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-x-2 max-w-[250px] relative">
        <span className="uppercase font-dinCondensed text-2xl yield-text">
          Yield:
        </span>
        <input
          className="bg-transparent white custom-share-input border-0 border-b text-base w-32 pr-4"
          type="number"
          name="dividendYield"
          min="0"
          value={props.dividendYieldForm}
          defaultValue="4"
          onChange={(e) => {
            props.setDividendYieldForm(e.target.valueAsNumber);
          }}
        />
        <input
          className="white custom-share-input-mobile border-0 border-b text-base w-32 pr-4 pl-2 text-black"
          type="number"
          name="dividendYield"
          placeholder="Running Yield"
          min="0"
          value={props.dividendYieldForm}
          defaultValue="4"
          onChange={(e) => {
            props.setDividendYieldForm(e.target.valueAsNumber);
          }}
        />
        <span className="text-base text-white absolute right-0 font-semibold yield-percentage">
          %
        </span>
      </div>
      <button
        className="border border-white rounded-[20px] w-24 py-0 text-base h-fit self-center example-eta-go"
        onClick={props.handleFormRequest}
      >
        GO
      </button>
    </div>
  );
};

export default CustomShareFormView;
