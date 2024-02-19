import { NewDetailedViewProps } from '../NewDetailedView.props';
import GrowthDetails from '../../GrowthDetails';
import { GROWTH_CHART_PURPLE } from 'common/consts/chartColors';

const UltraGrowth: React.FC<NewDetailedViewProps> = (
  props: NewDetailedViewProps
) => (
  <div className={props.className}>
    <GrowthDetails
      isMobileView={props.isMobileDetailedView}
      color="text-[#DFE0F1]"
      stroke="#A74346"
      profile={props.profile}
      content={props.content}
      activeSecurity={props.activeSecurity}
      textColor={props.textColor}
      riskExposure={
        <>
          1<sup className="text-xxs">st</sup> Loss
        </>
      }
      etaPercentFill={GROWTH_CHART_PURPLE.etaPercentFill}
      setActiveEtaType={props.setActiveEtaType}
    />
  </div>
);

export default UltraGrowth;
