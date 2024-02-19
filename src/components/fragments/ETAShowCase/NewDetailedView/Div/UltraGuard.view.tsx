import { NewDetailedViewProps } from '../NewDetailedView.props';
import DivDetails from '../../DivDetails';
import { DIV_CHART_PURPLE } from 'common/consts/chartColors';

const UltraGuard: React.FC<NewDetailedViewProps> = (
  props: NewDetailedViewProps
) => (
  <div className={props.className}>
    <DivDetails
      isMobileView={props.isMobileDetailedView}
      stroke="#342C53"
      barFill="#7268AF"
      barStroke="#342C53"
      color="text-[#342C53]"
      profile={props.profile}
      content={props.content}
      activeSecurity={props.activeSecurity}
      textColor={props.textColor}
      riskExposure={
        <>
          {props.capitalGuard[0]}.{props.capitalGuard[1]}%
          <br />
          <span className="text-xs">GUARDED</span>
        </>
      }
      etaPercentFill={DIV_CHART_PURPLE.etaPercentFill}
      setActiveEtaType={props.setActiveEtaType}
    ></DivDetails>
  </div>
);

export default UltraGuard;
