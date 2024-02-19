import { NewDetailedViewProps } from '../NewDetailedView.props';
import DivDetails from '../../DivDetails';
import { DIV_CHART_RED } from 'common/consts/chartColors';

const MaxDiv: React.FC<NewDetailedViewProps> = (
  props: NewDetailedViewProps
) => (
  <div className={props.className}>
    <DivDetails
      isMobileView={props.isMobileDetailedView}
      barFill="#FCF4ED"
      stroke="#FCF4ED"
      barStroke="#C1ABA0"
      color="text-[#F9F2ED]"
      profile={props.profile}
      content={props.content}
      activeSecurity={props.activeSecurity}
      textColor={props.textColor}
      riskExposure={
        <>
          1<sup className="text-xxs">st</sup> Loss
        </>
      }
      etaPercentFill={DIV_CHART_RED.etaPercentFill}
      setActiveEtaType={props.setActiveEtaType}
    ></DivDetails>
  </div>
);

export default MaxDiv;
