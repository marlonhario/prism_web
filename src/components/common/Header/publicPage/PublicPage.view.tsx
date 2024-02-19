import { useNavigate } from 'react-router-dom';

import PrismLogo from 'assets/svg/prism-logo.svg';
import { ReactComponent as ArrowLeftIcon } from 'assets/svg/arrow-left.svg';
import { CloseOutlined } from '@ant-design/icons';
import ROUTES from 'common/consts/routes';

import './styles.scss';

export const PublicPageHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleClickNav = (destination: any) => () => {
    navigate(destination);
  };

  return (
    <div className="public-page-header-wrapper flex flex-row px-5 md:px-12 justify-between h-[50px] min-h-[50px] md:h-[95px] md:min-h-[95px] items-center relative z-20">
      <div className="flex md:hidden items-center w-1/4"></div>
      <img
        src={PrismLogo}
        alt="Prism Logo"
        className="cursor-pointer w-1/2 md:w-auto"
        onClick={handleClickNav(ROUTES.HOME)}
      />
      <button
        className="back-btn cursor-pointer hidden md:flex items-center text-[#FAFAFA] bg-[#A5A7AC] rounded-[20px] px-3 py-1 font-din2014 text-base"
        onClick={handleClickNav(-1)}
      >
        <ArrowLeftIcon />
        <span>back</span>
      </button>
      <CloseOutlined
        onClick={handleClickNav(-1)}
        className="!text-white w-1/4 block self-auto md:!hidden !text-right"
        width="16px"
        height="16px"
      />
    </div>
  );
};
