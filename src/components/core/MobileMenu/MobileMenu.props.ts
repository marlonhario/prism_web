import ROUTES from "common/consts/routes";
import NavMenu from "common/interfaces/NavMenu";
import NavSubmenu from "common/interfaces/NavSubmenu";
import { EducationTabIndex } from "components/fragments/EducationTabs";

export interface MobileMenuPublicProps {
    educationTabIndex: EducationTabIndex;
    closeMenu: () => void;
    setEducationTabIndex: (educationTabIndex: EducationTabIndex) => void;
}

export interface MobileMenuCalcedProps {
    handleClickMobileMenu: (type: 'education' | 'page', educationIndex: number) => void;
}


export const MOBILE_MENU: NavMenu[] = [
    {
        name: 'Home',
        type: 'education',
        tabIndex: EducationTabIndex.HOME,
        link: ROUTES.HOME,
        showIfNotLogin: true
    },
    {
        name: 'About',
        type: 'education',
        tabIndex: EducationTabIndex.ABOUT,
        link: ROUTES.HOME,
        showIfNotLogin: true
    },
    // {
    //     name: 'Example Share',
    //     type: 'page',
    //     tabIndex: EducationTabIndex.CUSTOM_SHARE,
    //     link: ROUTES.CUSTOM_SHARE
    // },
    // {
    //     name: 'Investor Centre',
    //     type: 'page',
    //     tabIndex: EducationTabIndex.HOME,
    //     link: "/investor-centre"
    // },
    {
        name: 'Perspective',
        type: 'page',
        tabIndex: EducationTabIndex.HOME,
        link: `${ROUTES.PERSPECTIVE}?ticker=III`,
        showIfNotLogin: true
    },
    {
        name: 'Contact',
        type: 'page',
        tabIndex: EducationTabIndex.CONTACT,
        link: ROUTES.CONTACT,
        showIfNotLogin: true
    },
]

export const MOBILE_SUBMENU:NavSubmenu[] = [
    {
        name: 'Cookies',
        link: ROUTES.COOKIES
    },
    {
        name: 'Email Disclaimer',
        link: ROUTES.EMAIL
    },
    {
        name: 'Disclaimer',
        link: ROUTES.DISCLAIMER
    }
]

export type MobileMenuProps = MobileMenuPublicProps & MobileMenuCalcedProps;