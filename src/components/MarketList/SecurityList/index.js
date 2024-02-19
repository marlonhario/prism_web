// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useRef, useState } from 'react';
import { Button } from 'antd';
import { map, includes, toUpper, isUndefined, size } from 'lodash';
import closedEye from 'assets/images/closed_eye.png';
import openedEye from 'assets/images/opened_eye.png';
import './styles.scss';
import EtaTypeDetails from './EtaTypeDetails';
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import AllEtaTypeDetails from './AllEtaTypeDetails';
import { getAllRegion } from '../utils';
import CustomImage from 'components/common/CustomImage';

const SecurityList = ({
  allEtas,
  securityList,
  expandedSecurity,
  onRowCollapseCallback,
  onRowExpandCallback,
  checkedDivEta,
  checkedGrowthEta,
  selectedRegion,
  onSelectedEtaTypeCallback,
  onSelectedCompanyHeaderCallback,
  tableBodyHeight
}) => {
  const initialStateOfSortObj = { active: false, order: 'ASC' };
  const [sortByAlphabet, setSortByAlphabet] = useState(initialStateOfSortObj);
  const [sortByGrowth, setSortByGrowth] = useState(initialStateOfSortObj);
  const [sortByYield, setSortByYield] = useState(initialStateOfSortObj);
  const [allEtaExpanded, setAllEtaExpanded] = useState(false);

  const alphaRef = useRef();
  alphaRef.current = [];

  const addToRefs = (el, char) => {
    if (el && !alphaRef.current.includes(el)) {
      alphaRef.current.push({ [char]: el });
    }
  }

  /**
   * @description It scrolls the security list to the first occurance of selected alphabet 
   * @param {string} clickedAlphabet 
   */
  const onHandleAlphaClick = (clickedAlphabet) => {
    const selectedAlphabet = [];
    alphaRef.current.map((val) => ((!isUndefined(val[clickedAlphabet])) && selectedAlphabet.push(val[clickedAlphabet])));
    if (!isUndefined(selectedAlphabet[0])) {
      selectedAlphabet[0].scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
    }
  };

  /**
   * @description Creates ablphabet array to use in filters
   */
  const getAlphabets = () => {
    let result = [];
    for (let i = 'A'.charCodeAt(); i <= 'Z'.charCodeAt(); i++) {
      result.push(String.fromCharCode(i));
    }
    return result;
  }

  /**
   * @description Reusable component for buttons in market list screen
   * @param {string} sortField 
   * @param {string} buttonText 
   * @param {object} sortByObj 
   */
  const sortButton = (sortField, buttonText, sortByObj) => (
    <Button
      className={`${sortField} ${(sortByObj.active) && 'active'}`}
      onClick={() => onHandleSort(sortField)}
      onDoubleClick={() => onHandleResetSort(sortField)}
    >
      <span>{buttonText}</span>
      <div className={`flex ${(sortField === "underlyingName") && "hidden right-1.5"} flex-col ml-1 relative`}>
        <CaretUpOutlined className={`absolute ${(sortByObj.active && sortByObj.order === "DESC") && 'textColorGray'}`} />
        <CaretDownOutlined className={`relative top-2 ${(sortByObj.active && sortByObj.order === "ASC") && 'textColorGray'}`} />
      </div>
    </Button>
  )

  /**
   * @description Resets sort values for security list based on growth, yield, alphabet
   * @param {string} sortField 
   */
  const onHandleResetSort = (sortField) => {
    if (sortField === "growth") {
      setSortByGrowth(initialStateOfSortObj);
    }
    if (sortField === "yield") {
      setSortByYield(initialStateOfSortObj);
    }
    if (sortField === "underlyingName") {
      setSortByAlphabet(initialStateOfSortObj);
    }
  }

  /**
   * @description Handles sorting for security list based on growth, yield, alphabet
   * @param {string} sortField 
   */
  const onHandleSort = (sortField) => {
    if (sortField === 'growth') {
      setSortByYield(initialStateOfSortObj);
      setSortByAlphabet(initialStateOfSortObj);
      setSortByGrowth({ active: true, order: (sortByGrowth.order === "ASC") ? "DESC" : "ASC" });
    }
    if (sortField === 'yield') {
      setSortByAlphabet(initialStateOfSortObj);
      setSortByGrowth(initialStateOfSortObj);
      setSortByYield({ active: true, order: (sortByYield.order === "ASC") ? "DESC" : "ASC" });
    }
    if (sortField === 'underlyingName') {
      setSortByGrowth(initialStateOfSortObj);
      setSortByYield(initialStateOfSortObj);
      setSortByAlphabet({ active: true, order: "ASC" });
    }
  }
  return (
    <>
      <div className='tableHeader flex flex-row p-2'>
        <div className='sortBy alphaSortHeader'>
          {((size(checkedGrowthEta) + size(checkedDivEta)) <= 4 || allEtaExpanded || sortByGrowth.active || sortByYield.active) ? (
            sortButton("underlyingName", "A-Z", sortByAlphabet)
          ) : ("A-Z")}
        </div>
        <div className='w-4/12 pl-2'>Underlying Security</div>
        <div className='sortBy w-4/12'>
          {sortButton("growth", "Sort by Growth", sortByGrowth)}
        </div>
        <div className='sortBy w-4/12'>
          {sortButton("yield", "Sort by Yield", sortByYield)}
        </div>
        <div className='w-2/12'>
          {((size(checkedGrowthEta) + size(checkedDivEta)) <= 4 || sortByGrowth.active || sortByYield.active) ? ("All ETAs") : (
            <Button
              className={`allEtaActionButton ${(allEtaExpanded) ? 'opened' : 'closed'}`}
              onClick={() => setAllEtaExpanded(!allEtaExpanded)}
            >
              <img
                className='inline-flex mr-1'
                src={(allEtaExpanded) ? openedEye : closedEye}
                alt='closedEye'
              /><span>All ETAs</span>
            </Button>
          )
          }
        </div>
      </div>
      <div className='flex flex-row tableBody' style={{'maxHeight': tableBodyHeight}}>
        <div className='alphaSort pt-2 pb-2 flex flex-col'>
          {map(getAlphabets(), value => (
            <div className='self-center' key={value}><div className={`alphabet ${((size(checkedGrowthEta) + size(checkedDivEta)) <= 4 || sortByGrowth.active || sortByYield.active) && 'disabled'}`} onClick={() => onHandleAlphaClick(value)}>{value}</div></div>
          ))}
        </div>
        <div className='securityTable overflow-auto w-full'>
          {map(securityList, security => (
            // (size(getAllRegion(selectedRegion)) > 0 ? includes(getAllRegion(selectedRegion)[0].subRegion, security.region) : true) && (
              <div key={security.ticker}>
                {
                  // (!sortByGrowth.active && !sortByYield.active && ((size(checkedGrowthEta) + size(checkedDivEta)) > 4)) && (
                    <div ref={(el) => addToRefs(el, toUpper(security.ticker.charAt(0)))} className={`tableContent ${(includes(expandedSecurity, security.ticker) || allEtaExpanded) && 'activated'} border-b border-dashed border-black-700 flex flex-row`}>
                      <div className='companyDetails flex flex-row w-full cursor-pointer' onClick={() => onSelectedCompanyHeaderCallback(security)}>
                        <div className='w-4/12 underlyingSecurity'>
                          <div className='tickerCode'><span>CODE</span>{security.ticker}</div>
                          <div className='tickerImage'>
                            <CustomImage
                              src={`/logos/${security.region}/${security.ticker}.svg`}
                              width="80%"
                              alt={security.ticker}
                              defaultPath={`/logos/logoPending.svg`}
                            />
                          </div>
                        </div>
                        <div className='w-8/12 securityDetails'>
                          <div className='securityName font-bold'>
                            {toUpper(security.longName)}
                          </div>
                          <div className='securityPrices'>
                            <div className='lastPrice'>
                              <label>LAST PRICE</label>
                              <div className='font-bold'>{`$${security.lastPrice}`}</div>
                            </div>
                            <div className='dividendYield'>
                              <label>DIVIDEND YEILD</label>
                              <div className='font-bold'>{`${(security.forwardDivYield * 100).toFixed(2)}%`}</div>
                            </div>
                            <div className='marketCap'>
                              <label>MARKET CAP</label>
                              <div className='font-bold'>{`${(security.marketCap / 1000).toFixed(1)}b`}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='w-2/12' onClick={() => onSelectedCompanyHeaderCallback(security)}>
                        <Button
                          className={`actionButton ${(includes(expandedSecurity, security.ticker) || allEtaExpanded) ? 'opened' : 'closed'}`}
                          value={security.ticker}
                          onClick={() => (includes(expandedSecurity, security.ticker) || allEtaExpanded) ? onRowCollapseCallback(security.ticker) : onRowExpandCallback(security.ticker)}
                        >
                          <img
                            className='inline-flex mr-1'
                            src={(includes(expandedSecurity, security.ticker) || allEtaExpanded) ? openedEye : closedEye}
                            alt='closedEye'
                          /><span>ETA</span>
                        </Button>
                      </div>
                    </div>
                  // )
                }
                {
                  ((allEtaExpanded && ((size(checkedGrowthEta) + size(checkedDivEta)) > 4 && (!sortByGrowth.active && !sortByYield.active))) || (includes(expandedSecurity, security.ticker) && ((size(checkedGrowthEta) + size(checkedDivEta)) > 4 && (!sortByGrowth.active && !sortByYield.active)))) && (
                    <EtaTypeDetails
                      underlyingSymbol={security.ticker}
                      allEtas={allEtas}
                      checkedGrowthEta={checkedGrowthEta}
                      checkedDivEta={checkedDivEta}
                      onSelectedEtaTypeCallback={onSelectedEtaTypeCallback}
                      onSelectedCompanyHeaderCallback={onSelectedCompanyHeaderCallback}
                      security={security}
                    />
                  )
                }
              </div>
            // )
          ))}
          {((size(checkedGrowthEta) + size(checkedDivEta)) <= 4 || sortByGrowth.active || sortByYield.active) &&
            <AllEtaTypeDetails
              allEtas={allEtas}
              sortByGrowth={sortByGrowth}
              sortByYield={sortByYield}
              sortByAlphabet={sortByAlphabet}
              checkedGrowthEta={checkedGrowthEta}
              checkedDivEta={checkedDivEta}
              securityList={securityList}
              selectedRegion={selectedRegion}
              onSelectedEtaTypeCallback={onSelectedEtaTypeCallback}
              onSelectedCompanyHeaderCallback={onSelectedCompanyHeaderCallback}
            />
          }
        </div>
      </div>
    </>
  );
}

export default SecurityList;