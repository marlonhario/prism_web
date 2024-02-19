import { NewDetailedViewProps } from '../NewDetailedView.props';
import DivDetails from '../../DivDetails';
import { DIV_CHART_GREEN } from 'common/consts/chartColors';

const PureDiv: React.FC<NewDetailedViewProps> = (
  props: NewDetailedViewProps
) => (
  <div className={props.className}>
    <DivDetails
      isMobileView={props.isMobileDetailedView}
      barFill="#3D8E74"
      stroke="#3D8E74"
      barStroke="#205544"
      color="text-[#205544]"
      profile={props.profile}
      content={props.content}
      activeSecurity={props.activeSecurity}
      riskExposure={<>Shared</>}
      textColor={props.textColor}
      etaPercentFill={DIV_CHART_GREEN.etaPercentFill}
      setActiveEtaType={props.setActiveEtaType}
    ></DivDetails>
  </div>
);

export default PureDiv;
