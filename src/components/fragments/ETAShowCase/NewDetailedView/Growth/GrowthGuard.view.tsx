import { NewDetailedViewProps } from '../NewDetailedView.props';
import GrowthDetails from '../../GrowthDetails';
import { GROWTH_CHART_RED } from 'common/consts/chartColors';

const GrowthGuard: React.FC<NewDetailedViewProps> = (
  props: NewDetailedViewProps
) => (
  <div className={props.className}>
    <GrowthDetails
      isMobileView={props.isMobileDetailedView}
      color="text-[#A94447]"
      stroke="#A74346"
      profile={props.profile}
      content={props.content}
      textColor={props.textColor}
      activeSecurity={props.activeSecurity}
      riskExposure={
        <>
          {props.capitalGuard[0]}.{props.capitalGuard[1]}%
          <br />
          <span className="text-xs">GUARDED</span>
        </>
      }
      etaPercentFill={GROWTH_CHART_RED.etaPercentFill}
      setActiveEtaType={props.setActiveEtaType}
    />
  </div>
);

export default GrowthGuard;
