import { Footer, Toolbar } from 'components/core';
import IntroLightbox from 'components/fragments/IntroLightbox';
import { MainLayoutProps } from './MainLayout.props';
import { useContext } from 'react';
import { AuthContext } from 'context/AuthContext';

const MainLayoutView: React.FC<MainLayoutProps> = (props: MainLayoutProps) => {
  const { isLogin } = useContext(AuthContext);

  window.onbeforeunload = function () {
    localStorage.removeItem('templogin');
    return '';
  };

  return (
    <>
      <div className="flex flex-col w-full h-full overflow-hidden">
        <div className="w-full min-h-[50px] xl:min-h-[95px]">
          <Toolbar />
        </div>
        <div
          className="main px-[50px] overflow-hidden"
          style={{ flex: '1 1 1px' }}
        >
          <div className="flex h-full w-full">{props.children}</div>
        </div>
        <div
          className="flex items-center px-[50px] w-full min-h-[50px]"
          style={{ flex: '0 1 30px' }}
        >
          <Footer
            isLoggedIn={isLogin}
            setShowLightBox={props.setShowLightbox}
          />
        </div>
      </div>
      {props.showLightbox && <IntroLightbox />}
    </>
  );
};

export default MainLayoutView;
