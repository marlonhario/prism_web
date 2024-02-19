import { NewDetailedViewProps } from '../NewDetailedView.props';
import GrowthDetails from '../../GrowthDetails';
import { GROWTH_CHART_GREEN } from 'common/consts/chartColors';

const PureGrowth: React.FC<NewDetailedViewProps> = (
  props: NewDetailedViewProps
) => (
  <div className={props.className}>
    <GrowthDetails
      isMobileView={props.isMobileDetailedView}
      color="text-[#CDEAE4]"
      stroke="#CDEAE4"
      profile={props.profile}
      content={props.content}
      activeSecurity={props.activeSecurity}
      riskExposure={<>Shared</>}
      textColor={props.textColor}
      etaPercentFill={GROWTH_CHART_GREEN.etaPercentFill}
      setActiveEtaType={props.setActiveEtaType}
    />
  </div>
);

export default PureGrowth;
