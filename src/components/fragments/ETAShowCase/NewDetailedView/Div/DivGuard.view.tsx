import { NewDetailedViewProps } from '../NewDetailedView.props';
import DivDetails from '../../DivDetails';
import { DIV_CHART_BLUE } from 'common/consts/chartColors';

const DivGuard: React.FC<NewDetailedViewProps> = (
  props: NewDetailedViewProps
) => (
  <div className={props.className}>
    <DivDetails
      isMobileView={props.isMobileDetailedView}
      stroke="#25375A"
      barFill="#426299B2"
      barStroke="#1A2741"
      color="text-[#1A2741]"
      textColor={props.textColor}
      profile={props.profile}
      content={props.content}
      activeSecurity={props.activeSecurity}
      riskExposure={
        <>
          {props.capitalGuard[0]}.{props.capitalGuard[1]}%
          <br />
          <span className="text-xs">GUARDED</span>
        </>
      }
      etaPercentFill={DIV_CHART_BLUE.etaPercentFill}
      setActiveEtaType={props.setActiveEtaType}
    ></DivDetails>
  </div>
);

export default DivGuard;
