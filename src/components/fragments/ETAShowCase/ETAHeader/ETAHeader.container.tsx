import { ETAHeaderProps, ETAHeaderPublicProps } from './ETAHeader.props';
import SecurityDropdown from './ETAHeader.view';
import useSelectorSafe from 'store/selectors/useSelectorSafe';
import Security from 'common/interfaces/Security';
import './index.scss';

const ETAHeaderContainer: React.FC<ETAHeaderPublicProps> = (
  props: ETAHeaderPublicProps
) => {
  // const [securityList, setSecurityList] = useState<Security[]>([]);
  const { prism } = useSelectorSafe((state) => state) || {};

  /**
   *@description Shows the markets view once the ETA Markets in the subheader is selected
   */
  const handleClickMarkets = () => (e: React.MouseEvent) => {
    e.preventDefault();
    props.setShowMarkets(true);
    localStorage.setItem('defaultLightBox', 'EtaMarkets');
  };

   /**
    * @description Sets the active security of the Perspective page to the selected security in the dropdown
    * @param security The selected security from the dropdown
    */
  const handleSelectSecurity = (security: Security) => {
    props.onHandleSecurityHeld(
      `${security.longName} (${security.ticker})`,
      security,
      true
    );
    if (props.isMobileView) props.updateETAType?.('red', 'growth');
  };

  const combinedProps: ETAHeaderProps = {
    ...props,
    securityList: prism?.securities || [],
    handleClickMarkets,
    handleSelectSecurity,
    handleLockETA: props.onLockETA,
  };

  return <SecurityDropdown {...combinedProps} />;
};

export default ETAHeaderContainer;
