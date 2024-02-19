import { DesktopMenuProps } from './DesktopMenu.props';
import { NavLink, useLocation } from 'react-router-dom';
import { DESKTOP_MENU } from './DesktopMenu.props';
import { AuthContext } from 'context/AuthContext';
import { useContext } from 'react';

const DesktopMenuView: React.FC<DesktopMenuProps> = (
  props: DesktopMenuProps
) => {
  const { isLogin } = useContext(AuthContext);
  const location = useLocation();

  return (
    <ul className="font-din2014 flex px-5 items-center justify-between w-full h-full gap-x-8 uppercase text-[17px]">
      {DESKTOP_MENU.map((menu, index) => {
        let isActive = false;
        if (menu.type === 'education') {
          isActive = menu.tabIndex === props.educationTabIndex;
        } else {
          isActive = menu.link.split('?')[0] === location.pathname;
        }

        return (
          <NavLink
            className={`h-full flex items-center hover:text-white ${
              isActive ? 'text-white border-t border-white' : 'text-[#343741]'
            } ${!isLogin && !menu.showIfNotLogin ? 'invisible' : ''}`}
            to={menu.link}
            {...(menu.type === 'education'
              ? {
                  state: {
                    tabIndex: menu.tabIndex,
                  },
                }
              : {})}
            onClick={() => {
              props.handleDesktopMenuClick(menu);
            }}
            key={index}
          >
            {menu.name}
          </NavLink>
        );
      })}
    </ul>
  );
};

export default DesktopMenuView;
