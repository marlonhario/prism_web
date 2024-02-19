import { Divider } from 'antd';
import { PublicPageHeader } from 'components/common/Header/publicPage';
import { Footer } from 'components/core';
import IntroLightboxView from 'components/fragments/IntroLightbox';
import { AuthContext } from 'context/AuthContext';
import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import './styles.scss';

const PublicLayoutView = () => {
  const { isLogin, showLightbox, setShowLightbox } = useContext(AuthContext);

  return (
    <div className="w-full h-full flex flex-col font-din2014 public-bg overflow-hidden">
      <PublicPageHeader />
      <Divider
        style={{
          borderTopColor: '#000000',
          minWidth: '93%',
          width: '93%',
          margin: '3rem auto 2rem auto',
        }}
        className="!hidden md:!flex"
      />
      <div className="h-full sm:h-public-content-desktop w-full md:w-[93%] mx-auto flex flex-col sm:flex-row">
        <Outlet />
      </div>
      <div className="footer-main-container flex items-center  px-[50px] w-full min-h-[50px] overflow-y-auto">
        <Footer isLoggedIn={isLogin} setShowLightBox={setShowLightbox} />
      </div>

      {showLightbox && <IntroLightboxView />}
    </div>
  );
};

export default PublicLayoutView;
