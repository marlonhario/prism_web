import React, { useEffect, useRef, useState } from 'react';
import { getHorizontalLine } from '../fragments/EducationTabs/Intro/utils';
import './styles.scss';
import { ACCELERATE_GROWTH, AMPLIFIED_YIELD, SHARE_CAPITAL_RELEASE, BEAR_AND_BULL, BEAR_MARKET_STRATEGIES, BULL_MARKET_STRATEGIES, ESTATE_PLANNING, getHeaderImage, NEXT_GEN_INVESTORS, OVERSEAS_INVESTORS, RISK_MITIGATION, USE_CASES, ACCESS_LIQUIDITY, FEES, CORE_STRATEGIES, INSTITUTIONAL_INVESTOR } from './utils';

const Strategies = () => {
  const accelerateGrowthRef = useRef();
  const amplifiedYieldRef = useRef();
  const shareCapitalReleaseRef = useRef();
  const bearRef = useRef();
  const bullRef = useRef();
  const estatePlanningRef = useRef();
  const nextGenInvestorsRef = useRef();
  const overseasInvestorsRef = useRef();
  const riskMitigationRef = useRef();
  const institutionalInvestorsRef = useRef();
  const accessToLiquidityRef = useRef();

  const [coreOpportunitiesHover, setCoreOpportunitiesHover] = useState("");
  const [useCasesHover, setUseCasesHover] = useState("");
  const [bearAndBullHover, setBearAndBullHover] = useState("");
  const [bottomContentHeight, setBottomContentHeight] = useState(0);

  const strategiesRef = useRef();
  const topContentRef = useRef();

  useEffect(() => {
    updateHeightOfDivs();
    window.addEventListener("resize", updateHeightOfDivs, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateHeightOfDivs = () => {
    const bottomContentHeightCalc = (strategiesRef?.current?.clientHeight - (topContentRef?.current?.clientHeight + 20))
    setBottomContentHeight(`${bottomContentHeightCalc}px`)
  }


  const handleScroll = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  };

  const onHandleMouseOverAndOut = (menuType, hoverMenu) => {
    switch (menuType) {
      case CORE_STRATEGIES:
        setCoreOpportunitiesHover(hoverMenu);
        break;
      case USE_CASES:
        setUseCasesHover(hoverMenu);
        break;
      case BEAR_AND_BULL:
        setBearAndBullHover(hoverMenu);
        break;

      default:
        setCoreOpportunitiesHover("");
        setUseCasesHover("");
        setBearAndBullHover("");
        break;
    }
  }

  return (
    <div ref={strategiesRef} className="strategies">
      <div ref={topContentRef} className="topContent">
        <div className="headerText text-3xl leading-10 font-bold">
          Strategies
        </div>
        {getHorizontalLine("pb-6")}
        <div className="headerMenu">
          <div className="coreOpportunities">
            <div className="titleText">{CORE_STRATEGIES}</div>
            <div className="icons p-2 rightDivider">
              <div
                className="dot"
                onMouseOver={() => onHandleMouseOverAndOut(CORE_STRATEGIES, "ACCELERATE GROWTH")}
                onMouseOut={() => onHandleMouseOverAndOut(CORE_STRATEGIES, "")}
                onClick={(e) => handleScroll(accelerateGrowthRef)}
              ></div>
              <div
                className="dot"
                onMouseOver={() => onHandleMouseOverAndOut(CORE_STRATEGIES, "AMPLIFIED YIELD")}
                onMouseOut={() => onHandleMouseOverAndOut(CORE_STRATEGIES, "")}
                onClick={(e) => handleScroll(amplifiedYieldRef)}
              ></div>
              <div
                className="dot"
                onMouseOver={() => onHandleMouseOverAndOut(CORE_STRATEGIES, "SHARE CAPITAL RELEASE")}
                onMouseOut={() => onHandleMouseOverAndOut(CORE_STRATEGIES, "")}
                onClick={(e) => handleScroll(shareCapitalReleaseRef)}
              ></div>
            </div>
            <div className='min-h-full'>{coreOpportunitiesHover}</div>
          </div>
          <div className="bearAndBull">
            <div className="titleText">{BEAR_AND_BULL}</div>
            <div className="icons p-2 rightDivider">
              <div
                className="dot"
                onMouseOver={() => onHandleMouseOverAndOut(BEAR_AND_BULL, "BEAR MARKET STRATEGIES")}
                onMouseOut={() => onHandleMouseOverAndOut(BEAR_AND_BULL, "")}
                onClick={() => handleScroll(bearRef)}
              ></div>
              <div
                className="dot"
                onMouseOver={() => onHandleMouseOverAndOut(BEAR_AND_BULL, "BULL MARKET STRATEGIES")}
                onMouseOut={() => onHandleMouseOverAndOut(BEAR_AND_BULL, "")}
                onClick={() => handleScroll(bullRef)}
              ></div>
            </div>
            <div>{bearAndBullHover}</div>
          </div>
          <div className="useCases">
            <div className="titleText">{USE_CASES}</div>
            <div className="icons p-2">
              <div
                className="dot"
                onMouseOver={() => onHandleMouseOverAndOut(USE_CASES, "ESTATE PLANNING")}
                onMouseOut={() => onHandleMouseOverAndOut(USE_CASES, "")}
                onClick={() => handleScroll(estatePlanningRef)}
              ></div>
              <div
                className="dot"
                onMouseOver={() => onHandleMouseOverAndOut(USE_CASES, "NEXT GEN INVESTORS")}
                onMouseOut={() => onHandleMouseOverAndOut(USE_CASES, "")}
                onClick={() => handleScroll(nextGenInvestorsRef)}
              ></div>
              <div
                className="dot"
                onMouseOver={() => onHandleMouseOverAndOut(USE_CASES, "OVERSEAS INVESTORS")}
                onMouseOut={() => onHandleMouseOverAndOut(USE_CASES, "")}
                onClick={() => handleScroll(overseasInvestorsRef)}
              ></div>
              <div
                className="dot"
                onMouseOver={() => onHandleMouseOverAndOut(USE_CASES, "RISK MITIGATION")}
                onMouseOut={() => onHandleMouseOverAndOut(USE_CASES, "")}
                onClick={() => handleScroll(riskMitigationRef)}
              ></div>
              <div
                className="dot"
                onMouseOver={() => onHandleMouseOverAndOut(USE_CASES, "INSTITUTIONAL INVESTOR")}
                onMouseOut={() => onHandleMouseOverAndOut(USE_CASES, "")}
                onClick={() => handleScroll(institutionalInvestorsRef)}
              ></div>
              <div
                className="dot"
                onMouseOver={() => onHandleMouseOverAndOut(USE_CASES, "ACCESS TO LIQUIDITY")}
                onMouseOut={() => onHandleMouseOverAndOut(USE_CASES, "")}
                onClick={() => handleScroll(accessToLiquidityRef)}
              ></div>
            </div>
            <div>{useCasesHover}</div>
          </div>
        </div>
      </div>
      <div style={{ "maxHeight": bottomContentHeight }} className="bottomContent text-sm leading-6">
        <div className='relative'>
          {getHeaderImage("p-0")}
          <span className='absolute bottom-5 left-12 text-2xl text-white font-light'>Core Strategies</span>
        </div>
        <div className='accelerateGrowth' ref={accelerateGrowthRef}>{ACCELERATE_GROWTH}</div>
        <div className='amplifiedYield' ref={amplifiedYieldRef}>{AMPLIFIED_YIELD}</div>
        <div className='shareCapitalRelease' ref={shareCapitalReleaseRef}>{SHARE_CAPITAL_RELEASE}</div>
        <div className='relative'>
          {getHeaderImage("p-0")}
          <span className='absolute bottom-5 left-12 text-2xl text-white font-light'>Broader Market Outlook Strategies</span>
        </div>
        <div className='bearMarketStrategies' ref={bearRef}>{BEAR_MARKET_STRATEGIES}</div>
        <div className='bullMarketStrategies' ref={bullRef}>{BULL_MARKET_STRATEGIES}</div>
        <div className='relative'>
          {getHeaderImage("p-0")}
          <span className='absolute bottom-5 left-12 text-2xl text-white font-light'>Investor Specific Strategies</span>
        </div>
        <div className='estatePlanning' ref={estatePlanningRef}>{ESTATE_PLANNING}</div>
        <div className='nextGenInvestors' ref={nextGenInvestorsRef}>{NEXT_GEN_INVESTORS}</div>
        <div className='overseasInvestors' ref={overseasInvestorsRef}>{OVERSEAS_INVESTORS}</div>
        <div className='riskMitigation' ref={riskMitigationRef}>{RISK_MITIGATION}</div>
        <div className='strategicAdvantage' ref={institutionalInvestorsRef}>{INSTITUTIONAL_INVESTOR}</div>
        <div className='accessLiquidity' ref={accessToLiquidityRef}>{ACCESS_LIQUIDITY}</div>
        <div className='fees'>{FEES}</div>
      </div>
    </div>
  );
}

export default Strategies;