import React, { useEffect, useRef, useState } from "react";
import { Input } from "antd";
import axios from "axios";
import { pull, size, toLower, includes, trim, orderBy } from "lodash";
import "./styles.scss";
import MarketListFilters from "components/MarketList/Filters";
import { APIPath } from "components/MarketList/utils";
import SecurityList from "components/MarketList/SecurityList";

const MarketList = ({onSelectedEtaTypeCallback, onSelectedCompanyHeaderCallback}) => {
  const [securityList, setSecurityList] = useState([]);
  const [allEtas, setAllEtas] = useState([]);
  const [filteredSecurityList, setFilteredSecurityList] = useState([]);
  const [expandedSecurity, setExpandedSecurity] = useState([]);
  const [checkedDivEta, setCheckedDivEta] = useState([]);
  const [checkedGrowthEta, setCheckedGrowthEta] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [searchedSecurityName, setSearchedSecurityName] = useState("");

  /**
   * @description Expands ETA list view for selected company based on company code
   * @param {string} expandedRow Expanded company code
   */
  const onHandleRowExpand = (expandedRow) => {
    setExpandedSecurity([...expandedSecurity, expandedRow]);
  };

  /**
   * @description Collapses ETA list view for selected company based on company code
   * @param {string} closedRow collapsed company code
   */
  const onHandleRowCollapse = (closedRow) => {
    const updatedSecurity = pull(expandedSecurity, closedRow);
    setExpandedSecurity([...updatedSecurity]);
  };

  /**
   * @description Sorts security list by ascending order for the initial render
   * @param {object} sortObj sorting data
   * @param {string} sortOrder 
   * @param {string} sortByColumn 
   */
  const sortSecurityList = (sortObj, sortOrder, sortByColumn) => {
    const sortedSecurityList = orderBy(sortObj, [sortByColumn], [toLower(sortOrder)]);
    setSecurityList(sortedSecurityList);
  };

  /* Security list API */
  useEffect(() => {
    axios.get(APIPath.listOfSecurities).then((response) => {
      if (response?.status === 200) {
        sortSecurityList(response?.data, "ASC", "ticker");
      }
    });
  }, []);
  
  /* List of ETA objects */
  useEffect(() => {
    axios.get(APIPath.etas).then((response) => {
      if (response?.status === 200) {
        setAllEtas(response?.data);
      }
    });
  }, []);

  /**
   * @description Sets filtered security list based on company code and company name
   * @param {string} value input value
   */
  const onHandleSecuritySearch = (value) => {
    setSearchedSecurityName(trim(value))
    const matchedSecurities = securityList.filter(
      (v) =>
        includes(toLower(v.ticker), toLower(value)) ||
        includes(toLower(v.longName), toLower(value))
    );
    setFilteredSecurityList(matchedSecurities);
  };

  /**
   * @description To select dividend ETA filter in checkbox
   * @param {array} value 
   */
  const onHandleDivEtaTypeFilter = (value) => {
    const checkedEtaForDiv = (value.filter((v) => v.checked));
    setCheckedDivEta(checkedEtaForDiv);
  }
  
  /**
   * @description To select growth ETA filter in checkbox
   * @param {array} value 
   */
  const onHandleGrowthEtaTypeFilter = (value) => {
    const checkedEtaForGrowth = (value.filter((v) => v.checked));
    setCheckedGrowthEta(checkedEtaForGrowth);
  }
  
  /**
   * @description Sets selected region state to enable/disable region button
   * @param {string} selectedRegion 
   */
  const onHandleRegionFilter = (selectedRegion) => {
    setSelectedRegion(selectedRegion);
  }

  const [etaMarketlistHeight, setEtaMarketlistHeight] = useState(0);
  const [etaFilterHeight, setEtaFilterHeight] = useState(0);
  const [tableBodyHeight, setTableBodyHeight] = useState(0);

  const marketListRef = useRef();
  const etaFilterRef = useRef();

  useEffect(() => {
    updateHeightOfDivs();
    window.addEventListener("resize", updateHeightOfDivs, false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateHeightOfDivs = () => {
    setEtaMarketlistHeight(marketListRef?.current?.clientHeight);
    setEtaFilterHeight(etaFilterRef?.current?.clientHeight);
  }

  useEffect(() => {
    setTableBodyHeight(`${etaMarketlistHeight - (etaFilterHeight + 100)}px`);
  }, [etaFilterHeight, etaMarketlistHeight])

  return (
    <div ref={marketListRef} className="marketList">
      <div className="marketList__container flex flex-col px-3 pt-2">
        <div ref={etaFilterRef} className="mx-6">
          <div className="marketList__header flex flex-row w-full">
            <label className="headerText w-3/5">ETA MARKETS</label>
            <span className="w-2/5">
              <Input
                className="w-full text-center"
                placeholder="Enter Code or Security name to filter"
                name="securitySearch"
                onChange={(e) => onHandleSecuritySearch(e.target.value)}
              />
            </span>
          </div>
          <div className="marketList__filters">
            <MarketListFilters
              onCheckDivEtaCallback={(val) => onHandleDivEtaTypeFilter(val)}
              onCheckGrowthEtaCallback={(val) => onHandleGrowthEtaTypeFilter(val)}
              onCheckRegionCallback={(val) => onHandleRegionFilter(val)}
            />
          </div>
        </div>
        {size(securityList) > 0 && (
          <div className="marketList__table">
            <SecurityList
              allEtas={allEtas}
              securityList={
                size(searchedSecurityName) > 0
                  ? filteredSecurityList
                  : securityList
              }
              expandedSecurity={expandedSecurity}
              onRowCollapseCallback={(val) => onHandleRowCollapse(val)}
              onRowExpandCallback={(val) => onHandleRowExpand(val)}
              checkedDivEta={checkedDivEta}
              checkedGrowthEta={checkedGrowthEta}
              selectedRegion={selectedRegion}
              onSelectedEtaTypeCallback={onSelectedEtaTypeCallback}
              onSelectedCompanyHeaderCallback={onSelectedCompanyHeaderCallback}
              tableBodyHeight={tableBodyHeight}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketList;
