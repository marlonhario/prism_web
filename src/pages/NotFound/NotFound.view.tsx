import { Footer } from 'components/core';
import { PublicPageHeader } from 'components/common/Header/publicPage';
import './styles.scss';
import { AuthContext } from 'context/AuthContext';
import { useContext } from 'react';
import IntroLightboxView from 'components/fragments/IntroLightbox';

const NotFoundView: React.FC = () => {
  const { isLogin, showLightbox, setShowLightbox } = useContext(AuthContext);

  return (
    <div className="not-found-container w-full h-screen flex flex-col justify-between">
      <PublicPageHeader />
      <div className="not-found-overlay w-full h-full z-1 absolute top-0 opacity-40"></div>
      <div className="hex-of-light bg-cover lg:bg-contain bg-center bg-no-repeat w-full h-full absolute top-0 z-10 opacity-40"></div>
      <div className="outer-hex absolute h-full w-full bg-contain bg-center bg-no-repeat z-1 mt-[50px] mb-[25px] opacity-40"></div>
      <div className="inner-hex h-full w-full bg-center bg-no-repeat"></div>
      <div className="absolute w-full h-full flex flex-col z-10 justify-center items-center pt-[100px] font-din2014">
        <h1 className="mb-[70px] text-[170px] 2xl:text-[200px] 2xl:mb-[100px] 4xl:text-[234px] text-white">
          404
        </h1>
        <h2 className="text-[36px] text-white uppercase">Not Found</h2>
      </div>
      <div
        className="flex items-center px-[50px] w-full min-h-[50px]"
        style={{ flex: '0 1 30px' }}
      >
        <Footer isLoggedIn={isLogin} setShowLightBox={setShowLightbox} />
      </div>

      {showLightbox && (
        <IntroLightboxView />
      )}
    </div>
  );
};

export default NotFoundView;
