import { EducationTabIndex } from "components/fragments/EducationTabs";
import ROUTES from "common/consts/routes";
import NavMenu from "common/interfaces/NavMenu";

export interface DesktopMenuPublicProps {
    educationTabIndex: EducationTabIndex;
    setEducationTabIndex: (educationTabIndex: EducationTabIndex) => void;
}

export interface DesktopMenuCalcedProps {
    handleDesktopMenuClick: (menu: NavMenu) => void;
}

export type DesktopMenuProps = DesktopMenuPublicProps & DesktopMenuCalcedProps;

export const DESKTOP_MENU: NavMenu[] = [
    // {
    //   name: 'Perspective',
    //   type: 'page',
    //   tabIndex: EducationTabIndex.HOME,
    //   link: `${ROUTES.PERSPECTIVE}?ticker=III`
    // },
    {
      name: 'Optimiser',
      type: 'page',
      tabIndex: EducationTabIndex.EQUITY_OPTIMISER,
      link: ROUTES.OPTIMISER,
      showIfNotLogin: false
    },
    {
      name: 'About',
      type: 'education',
      tabIndex: EducationTabIndex.ABOUT,
      link: ROUTES.HOME,
      showIfNotLogin: true
    },
    {
      name: 'Contact',
      type: 'page',
      tabIndex: EducationTabIndex.CONTACT,
      link: ROUTES.CONTACT,
      showIfNotLogin: true
    }
  ]