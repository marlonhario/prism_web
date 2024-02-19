import React, { useState } from 'react';
import { MarketsProps } from './Markets.props';
import MarketsTableHeader from 'components/fragments/Markets/MarketsTableHeader';
import MarketsTableBody from 'components/fragments/Markets/MarketsTableBody';
import MarketsAlphabet from 'components/fragments/Markets/MarketsAlphabet';
import BackToTop from 'components/fragments/Markets/BackToTop';
import ETAList from 'components/fragments/Markets/ETAList';
import SmallCube from 'assets/svg/small_cube.svg';
import { ReactComponent as FilterIcon } from 'assets/svg/filter-icon.svg';
import MarketsModalFilter from 'components/fragments/Markets/MarketsModalFilter';
import cn from 'classnames';
import { map } from 'lodash';
import { REGIONS } from 'common/consts';
import RegionCheckbox from 'components/fragments/Markets/RegionCheckbox';
import { Switch } from 'antd';
import { useContext } from 'react';
import { MainContext } from 'context/MainContext';
import { SearchOutlined } from '@ant-design/icons';
import CustomShareETAMarkets from 'assets/images/custom-share-eta-market.png';
import './styles.scss';


const Markets: React.FC<MarketsProps> = (props: MarketsProps) => {
  const { expand } = useContext(MainContext);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <div className="w-full h-full flex flex-col gray-background markets-page-container">
      <div className="w-full flex flex-row px-5 xl:py-[10px] eta-header text-[#474C55] markets-header h-[47px] max-h-[47px] xl:h-[75px] xl:max-h-[75px]">
        <div
          className="w-[16%] 2xl:w-[14%] flex flex-row gap-x-3 items-center cursor-pointer close-markets"
          onClick={() => {
            props.closeMarkets();
            localStorage.setItem('defaultLightBox', '');
          }}
        >
          <img src={SmallCube} alt="small cube" className='hidden xl:block' />
          <img src={CustomShareETAMarkets} width={30} height={30} alt={''} className="block xl:hidden" />
          <div className="flex flex-col">
            <h3 className="mb-0 text-[11px] leading-[11px] xl:text-[22px] text-white xl:leading-[22px] font-bold">
              ETA
            </h3>
            <span className="mb-0 text-[11px] leading-[11px] xl:text-[17px] text-white xl:leading-[17px]">
              MARKETS
            </span>
          </div>
        </div>

        <div className="w-[10%] 2xl:w-[8%] px-2 4xl:px-5 flex flex-col border-l border-[#878C95] items-center justify-center eta-switch text-center">
          <Switch
            className="markets-switch"
            checked={props.allShown}
            onChange={() => props.setAllShown(!props.allShown)}
          />
          <span className="font-dinCondensed text-[13.4312px] leading-[13px] text-white mt-[7px]">
            ETAs ONLY
          </span>
        </div>
        <div className="w-[21%] px-5 flex border-l border-[#878C95] items-end mb-2 search-market">
          <SearchOutlined
            className={`${
              showMobileSearch ? '' : 'hide-search-icon '
            }search-mobile-icon-left`}
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          />
          <input
            type="text"
            className={`${
              showMobileSearch ? '' : 'hide-mobile-search '
            }py-1 px-3 text-center w-full seach-eta rounded-2xl`}
            placeholder="Search for a share"
            value={props.searchValue}
            onChange={(e) => props.setSearchValue(e.target.value)}
          />
          <div
            className={`${
              showMobileSearch ? 'hide-search-icon ' : ''
            }search-mobile`}
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          >
            <SearchOutlined className="search-mobile-icon" />
            <span>Search</span>
          </div>
        </div>
        <div className="hidden w-[15%] open-filters flex-row items-center justify-end gap-x-3">
          <span className="mb-0 text-xs leading-none text-white">FILTERS</span>
          <FilterIcon
            className="cursor-pointer"
            onClick={() => props.setShowModal(true)}
            fill={props.showModal ? '#363942' : '#A5A7AC'}
          />
        </div>
        <div className="w-[19%] 2xl:w-[17%] flex flex-col px-5 border-r border-l border-[#878C95] mb-2 hide-mobile">
          <span className="flex-1 text-white">Region</span>
          <div className="flex flex-row w-full gap-x-1 4xl:gap-x-3">
            {map(REGIONS, (region) => {
              return (
                <RegionCheckbox
                  region={region}
                  handleChange={props.handleSelectRegion}
                  checked={props.selectedRegions.includes(region.value)}
                  key={region.name}
                />
              );
            })}
          </div>
        </div>
        <div className="w-[20%] flex items-end px-5 border-r border-[#878C95] mb-2 hide-mobile">
          <select
            name="sector"
            className="prism-scrollbar about-scrollbar markets-new-dropdown mx-auto mb-0 w-full text-white"
            value={props.sector || ''}
            onChange={(e) => {
              e.target.value === ''
                ? props.setSector(null)
                : props.setSector(e.target.value);
            }}
          >
            <option value="">Sector</option>
            {props.sectors.map((sector) => (
              <option value={sector} key={sector}>
                {sector}
              </option>
            ))}
          </select>
        </div>
        <div className="w-[20%] flex items-end px-5 mb-2 hide-mobile">
          <select
            name="industry"
            className="prism-scrollbar about-scrollbar markets-new-dropdown mx-auto mb-0 w-full text-white"
            value={props.industry || ''}
            onChange={(e) => {
              e.target.value === ''
                ? props.setIndustry(null)
                : props.setIndustry(e.target.value);
            }}
          >
            <option value="">Industry</option>
            {props.industries.map((industry) => (
              <option value={industry} key={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div
        className="flex flex-row h-full overflow-y-auto p-0 font-din2014 animate__animated animate__slideInDown relative markets-table"
        ref={props.marketsRef}
      >
        {/* The Alphabet in the left side of the table */}
        <MarketsAlphabet
          allShown={props.allShown}
          onHandleLetterClick={props.onHandleLetterClick}
          selectedETAsLength={props.selectedEtas.length}
          sortSecurities={props.sortSecurities}
        />
        {props.allShown ? (
          <div
            className={cn(
              'flex-col w-[95%] text-xs',
              props.allShown ? 'flex' : 'hidden'
            )}
          >
            <ETAList
              selectedEtas={props.selectedEtas}
              setAllShown={props.setAllShown}
              setSelectedEtas={props.setSelectedEtas}
              closeMarkets={props.closeMarkets}
              handleETAClick={props.handleETAClick}
            />
          </div>
        ) : (
          <div
            className={cn(
              'flex-col w-full xl:w-[95%] text-xs',
              props.allShown ? 'hidden' : 'flex'
            )}
          >
            <MarketsTableHeader
              securitySort={props.securitySort}
              setSecuritySort={props.setSecuritySort}
              setAllShown={props.setAllShown}
              sortSecurities={props.sortSecurities}
            />
            <MarketsTableBody
              virtuoso={props.virtuoso}
              selectedEtas={props.selectedEtas}
              securityList={props.securityList}
              handleETAClick={props.handleETAClick}
            />
            <BackToTop handleClick={props.backToTop} />
          </div>
        )}
      </div>
      {props.showModal && expand && (
        // the filter when the left hand view is expanded
        <MarketsModalFilter
          showModal={props.showModal}
          selectedRegions={props.selectedRegions}
          setShowModal={props.setShowModal}
          industries={props.industries}
          sectors={props.sectors}
          industry={props.industry}
          sector={props.sector}
          setIndustry={props.setIndustry}
          setSector={props.setSector}
          setSelectedRegions={props.setSelectedRegions}
        />
      )}
    </div>
  );
};

export default Markets;
