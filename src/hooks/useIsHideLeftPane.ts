import { SECOND_LAYOUT_CHANGE } from 'common/consts/breakpoints';
import ROUTES from 'common/consts/routes';
import { EducationTabIndex } from 'components/fragments/EducationTabs';
import { useLocation } from 'react-router-dom';
import useWindowSize from './useWindowSize';

const useIsHideLeftPane = (tabIndex: EducationTabIndex) => {
  const { width } = useWindowSize();
  const { pathname } = useLocation();

  const paths = pathname === ROUTES.PERSPECTIVE || pathname === ROUTES.CUSTOM_SHARE || pathname === ROUTES.HOME;
  return paths && width && width <= SECOND_LAYOUT_CHANGE && ![EducationTabIndex.HOME, EducationTabIndex.ABOUT, EducationTabIndex.CONTACT].includes(tabIndex);
};

export default useIsHideLeftPane;