import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import * as Pages from 'pages';
import MainLayout from 'components/layouts/MainLayout';
import PublicLayout from 'components/layouts/PublicLayout';
import { MainContextProvider } from 'context/MainContext';
import { useContext } from 'react';
import { AuthContext } from 'context/AuthContext';
import ROUTES from 'common/consts/routes';

const PrismRoutesView: React.FC = () => {
  const { isLogin } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path={ROUTES.LOGIN} element={<Pages.Login />} />
        <Route path={ROUTES.REGISTER} element={<Pages.Register />} />
        <Route
          path={ROUTES.BLANK}
          element={<Navigate to={ROUTES.HOME} replace />}
        />
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.PRIVACY} element={<Pages.Privacy />} />
          <Route path={ROUTES.DISCLAIMER} element={<Pages.Disclaimer />} />
          <Route path={ROUTES.EMAIL} element={<Pages.Email />} />
          <Route path={ROUTES.COOKIES} element={<Pages.Cookies />} />
          {/* <Route path={ROUTES.INVESTOR_CENTRE} element={<Pages.InvestorCenter />} /> */}
        </Route>

        {/* Private Routes */}
        <Route
          element={
            <MainContextProvider>
              <MainLayout />
            </MainContextProvider>
          }
        >
          <Route path={ROUTES.HOME} element={<Pages.Perspective />} />
          <Route path={ROUTES.PERSPECTIVE} element={<Pages.Perspective />} />
          <Route path={ROUTES.CONTACT} element={<Pages.Contact />} />
          <Route path={ROUTES.CUSTOM_SHARE} element={<Pages.CustomShare />} />
          <Route
            path={ROUTES.OPTIMISER}
            element={
              isLogin ? (
                <Pages.EquityOptimiser />
              ) : (
                <Navigate to={ROUTES.HOME} replace />
              )
            }
          />
        </Route>
        {/* 404 Page */}
        <Route path={ROUTES.ALL} element={<Pages.NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PrismRoutesView;
