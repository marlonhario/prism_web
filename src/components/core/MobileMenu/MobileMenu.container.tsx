import { MobileMenuPublicProps } from './MobileMenu.props';
import MobileMenuView from './MobileMenu.view';

const MobileMenuContainer: React.FC<MobileMenuPublicProps> = (
  props: MobileMenuPublicProps
) => {

  /**
   * @description Sets the education tab index depending on the menu selected
   * @param type the menu type
   * @param educationIndex the education tab index corresponding to the view
   */
  const handleClickMobileMenu = (
    type: 'education' | 'page',
    educationIndex: number
  ) => {
    props.closeMenu();
    props.setEducationTabIndex(educationIndex);
  };

  return (
    <MobileMenuView
      {...props}
      handleClickMobileMenu={handleClickMobileMenu}
    />
  );
};

export default MobileMenuContainer;
