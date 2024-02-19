import React, { useEffect, useRef, useState } from 'react';
import { Select } from 'antd';
import { isEmpty, toLower } from 'lodash';
import { CURRENCIES } from 'common/consts';
import { formatCurrency } from 'components/NewLearnMoreMarket/utils';
import Security from 'common/interfaces/Security';
import { DefaultOptionType } from 'antd/lib/select';
import { OptionType } from 'components/fragments/ETAShowCase/ETAHeader/ETAHeader.props';
import { Nullable } from 'common/types';
import { BaseSelectRef } from 'rc-select';

const { Option } = Select;

const SecurityDropdownView: React.FC<{
  securities: Security[];
  security: Nullable<Security>;
  onSelect: (security: Security) => void;
}> = ({ ...props }) => {
  const [selectFocus, setSelectFocus] = useState<number>(0);

  const selectRef = useRef<BaseSelectRef>(null);

  useEffect(() => {
    if (selectFocus > 0) {
      const item = document.getElementsByClassName(
        'ant-select-selection-item'
      )[0];

      if (item) {
        item.classList.add('hide-element');
      }
    }
  }, [selectFocus]);

  const onFocus = () => {
    const searchBar = document.getElementsByClassName(
      'ant-select-selection-search'
    )[0];
    const searchBarInput = document.getElementsByClassName(
      'ant-select-selection-search-input'
    )[0];
    const placeholder = document.getElementsByClassName(
      'ant-select-selection-placeholder'
    )[0];
    const item = document.getElementsByClassName(
      'ant-select-selection-item'
    )[0];

    const selector = document.getElementsByClassName('ant-select-selector')[0];
    if (placeholder) {
      placeholder.classList.add('hide-element');
    }
    if (searchBarInput) {
      searchBarInput.classList.add('ant-search-background', 'rounded-3xl');
    }
    if (searchBar) {
      searchBar.classList.add('search-bar');
    }
    if (selector) {
      selector.classList.add('ant-selector-padding');
    }
    if (item) {
      item.classList.add('hide-element');
    }
    setSelectFocus(selectFocus + 1);
  };

  const onBlur = () => {
    const selector = document.getElementsByClassName('ant-select-selector')[0];
    const searchBarInput = document.getElementsByClassName(
      'ant-select-selection-search-input'
    )[0];
    const placeholder = document.getElementsByClassName(
      'ant-select-selection-placeholder'
    )[0];
    const searchBar = document.getElementsByClassName(
      'ant-select-selection-search'
    )[0];
    const item = document.getElementsByClassName(
      'ant-select-selection-item'
    )[0];
    if (searchBar) {
      searchBar.classList.remove('search-bar');
    }
    if (searchBarInput) {
      searchBarInput.classList.remove('ant-search-background', 'rounded-3xl');
    }
    if (selector) {
      if (!isEmpty(props.security)) {
        selector.classList.remove('ant-selector-padding');
      } else {
        selector.classList.add('ant-selector-padding');
      }
    }
    if (placeholder) {
      if (!isEmpty(props.security)) {
        placeholder.classList.remove('bg-white', 'rounded-3xl', 'hide-element');
      } else {
        placeholder.classList.remove('hide-element');
        placeholder.classList.add('bg-white', 'rounded-3xl');
      }
    }
    if (item) {
      item.classList.remove('hide-element');
    }
  };

  useEffect(() => {
    const selector = document.getElementsByClassName('ant-select-selector')[0];
    const placeholder = document.getElementsByClassName(
      'ant-select-selection-placeholder'
    )[0];
    if (isEmpty(props.security)) {
      if (selector) selector.classList.add('ant-selector-padding');
      if (placeholder) placeholder.classList.add('bg-white', 'rounded-3xl');
    } else {
      onBlur();
    }
  }, [props.security]);
  return (
    <Select
      className="border border-solid border-[#DDDDDD]"
      showSearch={true}
      placeholder="search for a share"
      optionFilterProp="children"
      popupClassName ={'autocomplete-dropdown'}
      dropdownMatchSelectWidth={true}
      ref={selectRef}
      value={
        props.security && !isEmpty(props.security)
          ? `${props.security.longName} (${props.security.ticker})`
          : undefined
      }
      suffixIcon={null}
      onBlur={onBlur}
      onFocus={onFocus}
      onSearch={onFocus}
      // showArrow={false}
      filterOption={(input, option) =>
        toLower(option?.value?.toString()).includes(toLower(input))
      }
      onSelect={(value: string, option: DefaultOptionType) => {
        // let newOption
        let newOption = { ...option } as OptionType;
        let security = {
          ticker: newOption.ticker,
          longName: newOption.longname,
          region: newOption.region,
          lastPrice: newOption.lastprice,
          forwardDivYield: newOption.forwarddivyield,
          marketCap: newOption.marketcap,
          text: newOption.text,
          value: newOption.value,
          chgNet1d: newOption.chgNet1d,
        } as Security;
        // setActiveSecurity(security)
        // props.onHandleSecurityHeld(value, security, true);
        props.onSelect(security);
        selectRef.current?.blur();
      }}
      style={{
        color: '#474C55',
      }}
    >
      {props.securities.map((data) => {
        return (
          <Option
            key={data.ticker}
            value={`${data.longName} (${data.ticker})`}
            ticker={data.ticker}
            longname={data.longName}
            forwarddivyield={data.forwardDivYield}
            lastprice={data.lastPrice}
            marketcap={data.marketCap}
            region={data.region}
            chgNet1d={data.chgNet1d}
          >
            <div className="flex flex-row gap-x-3 py-0 px-3 items-center text-white">
              <div className="flex flex-col flex-1 text-left leading-tight w-1/4">
                <span className="text-sm font-semibold">LAST PRICE</span>
                <span className="text-base font-semibold">
                  {formatCurrency(data.lastPrice, CURRENCIES.get(data.region))}
                </span>
              </div>
              <div className="flex flex-col flex-1 items-center text-center leading-tight w-1/2">
                {/* <CustomImage
                  src={`/logos/${data.region}/${data.ticker}${whiteSecurityImageSuffix}.svg`}
                  alt={data.ticker}
                  defaultPath={`/logos/logoPending.svg`}
                  defaultWidth={100}
                  width={'100px'}
                  className="cursor-pointer h-9"
                /> */}
                <span className='font-din2014 font-extrabold text-5xl tracking-wider'>{data.ticker}</span>
                <span className="uppercase text-xs block overflow-hidden w-full">
                  {data.longName}
                </span>
              </div>
              <div className="flex flex-col flex-1 text-right leading-tight w-1/4">
                <span className="text-sm font-semibold">YIELD</span>
                <span className="text-base font-semibold">
                  {(data.forwardDivYield * 100).toFixed(2)}%
                </span>
              </div>
            </div>
          </Option>
        );
      })}
    </Select>
  );
};

export default SecurityDropdownView;
