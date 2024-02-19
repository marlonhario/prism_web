import NavMenu from 'common/interfaces/NavMenu';
import { DesktopMenuPublicProps } from './DesktopMenu.props';
import DesktopMenuView from './DesktopMenu.view';

const DesktopMenuContainer: React.FC<DesktopMenuPublicProps> = (
  props: DesktopMenuPublicProps
) => {

  /**
   * @description Sets the default lightbox and the education tab index depending on the menu selected
   * @param menu The link in the menu selected
   */
  const handleDesktopMenuClick = (menu: NavMenu) => {
    if (menu.type === 'page') {
      localStorage.setItem('defaultLightBox', menu.name); 
    }
    props.setEducationTabIndex(menu.tabIndex)
  };

  return (
    <DesktopMenuView
      {...props}
      handleDesktopMenuClick={handleDesktopMenuClick}
    ></DesktopMenuView>
  );
};

export default DesktopMenuContainer;
