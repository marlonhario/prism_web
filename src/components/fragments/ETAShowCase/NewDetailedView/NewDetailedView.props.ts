import { Security } from 'common/interfaces/ETAShowcase/Security';
import { Content } from 'common/interfaces/ETAShowcase/Content';
import { ProfileInterface } from 'common/interfaces/ETAShowcase/Profile';
import { Profile } from 'components/NewCubeModel';

export interface NewDetailedViewPublicProps {
  className: string;
  profile: ProfileInterface;
  profileType: string;
  content: Content;
  activeEtaType: string;
  activeSecurity: Security;
  textColor?: string;
  isMobileDetailedView?: boolean;
  setActiveEtaType: (activeEtaType: Profile | '') => void;
}

export interface NewDetailedViewCalcedProps {
  capitalGuard: Array<string>;
}

export type NewDetailedViewProps = NewDetailedViewPublicProps &
  NewDetailedViewCalcedProps;
