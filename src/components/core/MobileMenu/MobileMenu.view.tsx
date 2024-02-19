import { NavLink, useLocation } from 'react-router-dom';
import { MobileMenuProps } from './MobileMenu.props';
import { MOBILE_MENU, MOBILE_SUBMENU } from './MobileMenu.props';
import { CloseOutlined } from '@ant-design/icons';
import { InstagramOutlined, LinkedinFilled } from '@ant-design/icons';
import './styles.scss';
import ROUTES from 'common/consts/routes';

const LinkItem: React.FC<{
  children: React.ReactNode;
  link: string;
  target?: string;
  classNames?: string
}> = ({ children, link, target = '_self', classNames = "" }) => (
  <a
    href={link}
    target={target}
    className={`text-[#DDDDDD] hover:text-black uppercase ${classNames}`}
  >
    {children}
  </a>
);

const MobileMenuView: React.FC<MobileMenuProps> = (props: MobileMenuProps) => {
  const location = useLocation();
  return (
    <div
      className={`mobile-menu flex flex-col animate__animated animate__fadeInDown z-10 absolute top-0 w-full h-screen text-xl pt-5 px-4 gap-y-2 text-left font-din2014 xl:hidden`}
    >
      <CloseOutlined
        onClick={props.closeMenu}
        className="!text-white self-end mr-5"
        width="16px"
      />
      <div className="flex flex-col gap-y-7 h-full">
        <div className="border-b border-white flex flex-col px-4 gap-y-6 uppercase text-2xl pb-7">
          {MOBILE_MENU.map((menu, i) => {
            let isActive = false;
            if (
              menu.type === 'education' &&
              location.pathname === ROUTES.HOME
            ) {
              isActive = menu.tabIndex === props.educationTabIndex;
            } else {
              isActive = menu.link.split('?')[0] === location.pathname;
            }
            return (
              <NavLink
                className={isActive ? 'text-white' : 'text-[#8B8E94]'}
                to={menu.link}
                {...(menu.type === 'education'
                  ? {
                      state: {
                        tabIndex: menu.tabIndex,
                      },
                    }
                  : {})}
                onClick={() => {
                  props.handleClickMobileMenu(menu.type, menu.tabIndex)
                }}
                key={i}
              >
                {menu.name}
              </NavLink>
            );
          })}
        </div>
        <div className="flex flex-col px-4 gap-y-6 uppercase text-[11px] font-bold">
          {MOBILE_SUBMENU.map((submenu, i) => {
            return (
              <NavLink className="text-white" to={submenu.link} key={i}>
                {submenu.name}
              </NavLink>
            );
          })}
        </div>
        <div className="flex gap-x-8 px-4 grow">
          <LinkItem
            link="https://www.instagram.com/prismglobal.co"
            target="_blank"
          >
            <InstagramOutlined className="text-xl" />
          </LinkItem>
          <LinkItem
            link="https://www.linkedin.com/company/prismglobalmarkets/"
            target="_blank"
          >
            <LinkedinFilled className="text-xl" />
          </LinkItem>
        </div>
        <div className="px-4 text-[#BBBBBB] text-[11px] font-bold tracking-[0.3em] mb-5">
          <span className='text-[13px]'>&copy;</span> PRISM MARKETS {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
};

export default MobileMenuView;
