import PrismLogo from 'assets/svg/prism-logo.svg';
import { InstagramOutlined, LinkedinFilled } from '@ant-design/icons';
import './styles.scss';

const LinkItem: React.FC<{
  children: React.ReactNode;
  link: string;
  target?: string;
}> = ({ children, link, target = '_self' }) => (
  <a
    href={link}
    target={target}
    className="text-[#DDDDDD] hover:text-black uppercase"
  >
    {children}
  </a>
);

const MobilePlaceholderView: React.FC = () => {
  return (
    <div className="flex flex-col pt-20 items-center h-screen font-din2014 coming-soon-hex-of-light sm:pt-4">
      <div className="flex flex-col items-center w-full gap-y-10 sm:flex-row sm:justify-between sm:px-5">
        <img src={PrismLogo} alt="Prism Logo" className="w-2/3 sm:w-2/6" />
        <h1 className="text-[#343741] text-base mb-10 sm:mb-0">
          mobile site coming soon
        </h1>
      </div>

      <div className="grow flex flex-col w-full justify-end mb-6 px-10 gap-y-10 sm:gap-y-5 sm:px-5">
        <div className="border-half border-white rounded-[30px] text-center text-white text-base font-light leading-[20px] sm:w-fit sm:self-center sm:px-2">
          please visit our website via desktop
        </div>
        <div className="flex justify-between">
          <div className="flex gap-x-3 justify-start items-end">
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
          <span className="text-[#C0C1C6] self-end justify-end">
            ©Prism Global Group {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MobilePlaceholderView;
