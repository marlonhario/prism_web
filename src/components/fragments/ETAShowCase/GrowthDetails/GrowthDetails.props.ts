import { ProfileInterface } from 'common/interfaces/ETAShowcase/Profile';
import { Content } from 'common/interfaces/ETAShowcase/Content';
import { Security } from 'common/interfaces/ETAShowcase/Security';
import { Profile } from 'components/NewCubeModel';

export interface GrowthDetailsProps {
  color: string;
  stroke: string;
  content: Content;
  profile: ProfileInterface;
  profile2?: ProfileInterface;
  activeSecurity: Security;
  // etaPercentFill: React.ReactChild;
  etaPercentFill: {
    type: 'radial' | 'linear';
    color1: string;
    offset1: string;
    opacity1: string;
    color2: string;
    offset2: string;
    opacity2: string;
  };
  riskExposure: React.ReactChild;
  textColor?: string;
  isMobileView?: boolean;
  setActiveEtaType: (activeEtaType: Profile | '') => void;
}
