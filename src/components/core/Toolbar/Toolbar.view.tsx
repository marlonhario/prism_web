import React, { useState } from 'react';
import clsx from 'classnames';
import PrismLogo from 'assets/svg/prism-logo.svg';
import { useNavigate } from 'react-router-dom';
import { MainContext } from 'context/MainContext';
import { useContext } from 'react';
import ROUTES from 'common/consts/routes';
import { ReactComponent as Hamburger } from 'assets/svg/hamburger.svg';
import DesktopMenu from '../DesktopMenu';
import MobileMenu from '../MobileMenu';

const ToolbarView: React.FC = () => {
  const navigate = useNavigate();
  const { educationTabIndex, setEducationTabIndex } = useContext(MainContext);

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  /**
   * @description Redirect to the home page, and resets the left hand tab
   */
  const handleClickLogo = () => {
    closeMenu();
    setEducationTabIndex(0);
    navigate(ROUTES.HOME);
  };

  /**
   * @description Closes the mobile menu
   */
  const closeMenu = () => {
    setShowMobileMenu(false);
  };

  return (
    <>
      <div className="flex w-full h-full px-5 lg:px-[50px] justify-around lg:justify-start">
        <div className="flex lg:hidden items-center w-1/4"></div>
        <div className="flex px-2 w-1/2 lg:w-2/3 h-full items-center justify-center lg:justify-start flex-no-shrink text-black">
          <img
            src={PrismLogo}
            alt="Prism Logo"
            className="cursor-pointer"
            onClick={handleClickLogo}
          />
        </div>
        <div className={clsx(`flex-grow px-2 h-full lg:w-1/3 hidden lg:block`)}>
          <DesktopMenu
            educationTabIndex={educationTabIndex}
            setEducationTabIndex={setEducationTabIndex}
          />
        </div>
        <div className="flex lg:hidden items-center w-1/4 justify-end">
          <Hamburger
            onClick={() => {
              setShowMobileMenu(!showMobileMenu);
            }}
          />
        </div>
      </div>
      {showMobileMenu && (
        <MobileMenu
          educationTabIndex={educationTabIndex}
          closeMenu={closeMenu}
          setEducationTabIndex={setEducationTabIndex}
        />
      )}
    </>
  );
};

export default ToolbarView;
