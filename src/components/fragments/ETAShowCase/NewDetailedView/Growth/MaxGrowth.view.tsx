import { NewDetailedViewProps } from '../NewDetailedView.props';
import GrowthDetails from '../../GrowthDetails';
import { GROWTH_CHART_BLUE } from 'common/consts/chartColors';

const MaxGrowth: React.FC<NewDetailedViewProps> = (
  props: NewDetailedViewProps
) => (
  <div className={props.className}>
    <GrowthDetails
      isMobileView={props.isMobileDetailedView}
      color="text-[#CBEBF7]"
      stroke="#AFCBD9"
      profile={props.profile}
      content={props.content}
      activeSecurity={props.activeSecurity}
      textColor={props.textColor}
      riskExposure={
        <>
          1<sup className="text-xxs">st</sup> Loss
        </>
      }
      etaPercentFill={GROWTH_CHART_BLUE.etaPercentFill}
      setActiveEtaType={props.setActiveEtaType}
    />
  </div>
);

export default MaxGrowth;
