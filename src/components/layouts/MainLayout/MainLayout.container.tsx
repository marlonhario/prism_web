import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { MainContext } from 'context/MainContext';
import { AuthContext } from 'context/AuthContext';
import MainLayoutView from './MainLayout.view';
import { prismThunk } from 'thunks';
import { Outlet, useLocation } from 'react-router-dom';
import { PerspectiveSliderContextProvider } from 'context/PerspectiveSliderContext';
import { tempVerifyAccess } from 'components/common/utils';
import { CustomShareContextProvider } from 'context/CustomShareContext';
import ROUTES from 'common/consts/routes';

const MainLayoutContainer: React.FC = () => {
  const location = useLocation();
  const {
    expand,
    setExpand,
    educationTabIndex,
    setEducationTabIndex
  } = useContext(MainContext);
  const { setIsLogin, showLightbox, setShowLightbox } = useContext(AuthContext);
  const dispatch = useDispatch();

  /**
   * @description checks if the route is in optimiser page and if it is, set expansion of the left hand side to false
   */
  useEffect(() => {
    if (location.pathname === ROUTES.OPTIMISER) {
      setExpand(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    dispatch(prismThunk.populateData);
    setIsLogin(tempVerifyAccess() === 'true');
  }, []);

  return (
    <PerspectiveSliderContextProvider>
      <CustomShareContextProvider>
        <MainLayoutView
          expand={expand}
          educationTabIndex={educationTabIndex}
          showLightbox={showLightbox}
          setExpand={setExpand}
          setEducationTabIndex={setEducationTabIndex}
          setShowLightbox={setShowLightbox}
        >
          <Outlet />
        </MainLayoutView>
      </CustomShareContextProvider>
    </PerspectiveSliderContextProvider>
  );
};

export default MainLayoutContainer;
