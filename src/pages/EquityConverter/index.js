import * as React from 'react';
import { useState } from 'react';
import cn from 'classnames';
import './styles.scss';
import CurrentPortfolio from 'components/EquityConverter/currentPortfolio';
import AlternatePosition from 'components/EquityConverter/alternatePosition';
import OptimiseETA from 'components/EquityConverter/Optimise';
import ConversionAllocation from 'components/EquityConverter/conversionAllocation';
import OrderForm from 'components/EquityConverter/OrderForm';
import { isEmpty, capitalize, size } from 'lodash';
import Transition from 'components/EquityConverter/utils/Transition';
import ContentPage from 'components/common/ContentPage';
import PayoffChart from 'components/payoff-chart';
import { etaTitleMapping } from 'components/EquityConverter/utils';


const EquityConverter = ({
  updateMarketListView,
  includePageContent = true,  // To determine whether we need to use page content or not. Page Content contains header and footer contents
  activeSecurityList,  // Active Security Content from MarketList
  activeETAList  // Active ETA Content from MarketList
}) => {

  const [activeSecurity, setActiveSecurity] = useState('');
  const [activeETALogo, setActiveETALogo] = useState('');
  const [activeSecurityContent, setActiveSecurityContent] = useState({});
  const [totalShare, setTotalShare] = useState('');
  const [eta, setETA] = useState('');
  const [etaDetails, setEtaDetails] = useState({});
  const [showAlternate, setShowAlternate] = useState(true);
  const [showOptimiseContent, setShowOptimiseContent] = useState(false);
  const [growthETA, setGrowthETA] = useState();
  const [incomeETA, setIncomeETA] = useState();
  const [allocationContent, setAllocationContent] = useState({});
  const [canRenderOrderForm, setCanRenderOrderForm] = useState(false);
  const [barContent, setBarContent] = useState({});
  const [optimisedPrice, setOptimisedPrice] = useState({});
  const [orderSideContent, setOrderSideContent] = useState({});

  // payoff chart variables
  const dimensions = {
    width: 214,
    height: 140,
    margin: 15,
  };

  /**
    * @description This method updates the Active Security Object to pass through different steps in Equity Converter
    * @param {object} securityList Header content details
  */
  const updateSecurity = (securityList) => {
    setActiveSecurityContent(securityList);
    setActiveSecurity(securityList.ticker);
  }

  /**
    * @description This method updates the current ETA logo to pass through different steps in Equity Converter
    * @param {string} etaLogo Header content details
  */
  const updateETALogo = (etaLogo) => {
    setActiveETALogo(etaLogo);
  }

  /**
    * @description This method updates the total shares to pass through different steps in Equity Converter
    * @param {string} totalShareValue Total Share counts
  */
  const updateTotalShare = (totalShareValue) => {
    setTotalShare(totalShareValue);
  }

  /**
    * @description This method updates the active ETA details from the ETA API
    * @param {object} etaDetails Active ETA details from ETA API
  */
  const updateETADetails = (etaDetails) => {
    setEtaDetails(etaDetails);
  }

  /**
    * @description This method updates the active ETA color from step2 to pass through all steps
    * @param {string} activeEta Active ETA color
  */
  const updateActiveETAValue = (activeEta) => {
    setETA(activeEta);
  }

  /**
    * @description This method whether render the Alternate block. By Default it is true
    * @param {boolean} state whether true or false
  */
  const showAlternateBlock = (state) => {
    setShowAlternate(state);
  }

  /**
    * @description This method whether render the Optimised block. By Default it is false and pass to state to the Parent container to hide the ETA Intro panel
    * @param {boolean} state whether true or false
  */
  const showOptimiseBlock = (state) => {
    setShowOptimiseContent(state);
    if (state && updateMarketListView) {
      updateMarketListView(state);
    }
  }

  /**
    * @description This method updates the Growth and Income Share Counts
    * @param {string} growthETAValue - Growth Share count
    * @param {string} incomeETAValue - income Share count
  */
  const updateETAContent = (growthETAValue, incomeETAValue) => {
    setGrowthETA(growthETAValue);
    setIncomeETA(incomeETAValue);
  }

  /**
    * @description This method updates the Allocation content from Step3
    * @param {object} allocationValue - Allocation object from Step3 to pass to Order form
  */
  const updateAllocationContent = (allocationValue) => {
    setAllocationContent(allocationValue);
  }

  /**
    * @description This method determines to render the Order Form step
    * @param {object} barContent - Bar content to render the Order form
    * @param {string} optimisedPrice - Optimised price value
  */
  const renderOrderForm = (barContent, optimisedPrice) => {
    setCanRenderOrderForm(true);
    setBarContent(barContent);
    setOptimisedPrice(optimisedPrice);
  }

  /**
  * @description This method updates the Order Form Content from Step3
  * @param {object} orderSideInfo - Order Side details to render Buy or Sell form
*/
  const updateOrderFormContent = (orderSideInfo) => {
    setOrderSideContent(orderSideInfo)
  }

  const renderETAContent = () => (
    <div className={cn('equity-container', { 'step2': showAlternate && !showOptimiseContent, "step1": !showAlternate, "step3": showOptimiseContent })}>
      <div className="flex">
        <Transition isOpen={!canRenderOrderForm} className={cn('step-content',
          {
            'transition-half': showAlternate && !showOptimiseContent && !canRenderOrderForm,
            'transition-quarter': showAlternate && showOptimiseContent && !canRenderOrderForm
          }
        )} isHorizontal={true} >
          <CurrentPortfolio
            activeContent={activeSecurityList}
            updateActiveSecurity={updateSecurity}
            updateTotalShare={updateTotalShare}
            triggerShowAlternate={showAlternateBlock}
            updateETA={updateETAContent}
            className='equity-container-white-background equity-container-step-container equity-container-step-border'
          />
        </Transition>
        {showAlternate && (
          <div className={cn('flex', { 'w-1/2': showAlternate && !showOptimiseContent, 'w-1/3': showOptimiseContent || canRenderOrderForm })}>
            {showAlternate && (
              <div className={cn('step-content w-full')} >
                <AlternatePosition
                  activeETAList={activeETAList}
                  activeSecurity={activeSecurity}
                  activeSecurityContent={activeSecurityContent}
                  updateETALogo={updateETALogo}
                  updateETADetails={updateETADetails}
                  updateETAValue={updateActiveETAValue}
                  triggerOptimiseBlock={showOptimiseBlock}
                  growthETA={growthETA}
                  incomeETA={incomeETA}
                  className={cn('equity-container-dark-background equity-container-step-container equity-container-step-content-spacing', { 'equity-container-step-border': showOptimiseContent })}
                />
              </div>
            )}
          </div>
        )}
        <div className={cn('relative flex', { 'w-1/3': showOptimiseContent && !canRenderOrderForm, ' w-1/3': showOptimiseContent && canRenderOrderForm })}>
          {showOptimiseContent && (
            <div className={cn('w-full step-content equity-container-dark-background flex-col',
                { 'equity-container-step-container equity-container-step-content-spacing': showOptimiseContent },
                { 'equity-container-step-border': canRenderOrderForm }
              )}>
              {!isEmpty(etaDetails) && !isEmpty(eta) && (
                <OptimiseETA
                  etaLogo={activeETALogo}
                  activeSecurityContent={activeSecurityContent}
                  totalShare={totalShare}
                  etaContent={etaDetails}
                  eta={eta}
                  updateAllocationContent={updateAllocationContent}
                  growthETA={growthETA}
                  incomeETA={incomeETA}
                  updateETA={updateETAContent}
                  updateOrderFormContent={updateOrderFormContent}
                />
              )}
              {showAlternate && showOptimiseContent && (
                <div className='allocation w-full mt-10'>
                  {!isEmpty(allocationContent) && !isEmpty(eta) && (
                    <ConversionAllocation
                      allocationContent={allocationContent}
                      eta={eta}
                      renderOrderForm={renderOrderForm}
                      isOrderFormVisible={canRenderOrderForm}
                    />
                  )}
                </div>
              )}
              {/* Renders Payoff chart */}
              {(!isEmpty(etaDetails) && !isEmpty(eta) && size(allocationContent) > 0) && (
                <div className='w-full flex gap-1'>
                  <div className='equityPayoffChart md:w-full xl:w-1/2'>
                    <div className='chartHeader'>
                      <span className={"font-extrabold"} style={{ color: etaTitleMapping[capitalize(eta)].growthColor }} >
                        Price Exposure</span> vs <span className='font-bold'>Underlying share
                      </span>
                    </div>
                    <PayoffChart
                      dimensions={dimensions}
                      underlyingSecurityPrice={activeSecurityContent.lastPrice}
                      eta1EstablishmentPrice={parseFloat(orderSideContent.growthLastPrice)}
                      eta2EstablishmentPrice={parseFloat(orderSideContent.incomeLastPrice)}
                      eta1LastPrice={parseFloat(orderSideContent.growthLastPrice)}
                      eta2LastPrice={parseFloat(orderSideContent.incomeLastPrice)}
                      eta1Type={etaTitleMapping[capitalize(eta)].growthTitle}
                      eta2Type={etaTitleMapping[capitalize(eta)].incomeTitle}
                      eta1Value={parseFloat(allocationContent.growthValueofHolding)}
                      eta2Value={parseFloat(allocationContent.incomeValueofHolding)}
                      underlyingEstab1Price={parseFloat(orderSideContent.growthLastPrice) + parseFloat(orderSideContent.incomeLastPrice)}
                      underlyingEstab2Price={parseFloat(orderSideContent.growthLastPrice) + parseFloat(orderSideContent.incomeLastPrice)}
                      cashReturned={parseFloat(allocationContent.totalCashReturned)}
                      showLegend={false}
                      showAxisLabel={false}
                      mouseOver={false}
                    />
                  </div>
                  <div className='equityDividentChart w-1/2'>

                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className={cn('relative flex', { 'w-1/3': canRenderOrderForm })}>
          <Transition
            isOpen={canRenderOrderForm}
            className={cn('w-full equity-order-form equity-container-dark-background',
              { 'equity-container-step-container equity-container-step-content-spacing': canRenderOrderForm }
            )}
            isHorizontal={true}
            isMoveFromRight={true}
          >
            {!isEmpty(allocationContent) && !isEmpty(eta) && (
              <OrderForm
                eta={eta}
                barContent={barContent}
                optimisedPrice={optimisedPrice}
                orderSideContent={orderSideContent}
                hideOrderForm={() => setCanRenderOrderForm(false)}
                activeSecurityContent={activeSecurityContent}
              />
            )}
          </Transition>
        </div>
      </div>
    </div>
  )
  //console.log('etaDetails', etaDetails)
  return (
    <>
      {includePageContent ? (
        <ContentPage skipHeader={true} skipFooter={true} childrenClassName={'page-content-header'}>
          {renderETAContent()}
        </ContentPage>
      ) : renderETAContent()}
    </>
  );
};

export default EquityConverter;
