import React from 'react';
import { InstagramOutlined, LinkedinFilled } from '@ant-design/icons';
import ROUTES from 'common/consts/routes';
import { FooterProps } from './Footer.props';

import './styles.scss';

// const LinkItem: React.FC<{ children: React.ReactChild }> = ({ children }) => (
//   // eslint-disable-next-line jsx-a11y/anchor-is-valid
//   <button className="text-xs text-gray-[#DDDDDD] hover:text-black-900 uppercase">
//     {children}
//   </button>
// );

const LinkItem: React.FC<{
  children: React.ReactNode;
  link: string;
  target?: string;
  classNames?: string;
}> = ({ children, link, target = "_self", classNames = "" }) => (
  <a
    href={link}
    target={target}
    className={`text-[#DDDDDD] hover:text-black uppercase ${classNames}`}
  >
    {children}
  </a>
);

const FooterView:React.FC<FooterProps> = ({ isLoggedIn, setShowLightBox }: FooterProps) => {
  return (
    <div className="z-20 footer-container flex justify-between items-center w-full font-din2014 tracking-[0.3em]">
      <div className="hidden md:flex gap-x-3 lg:gap-x-5 justify-start items-end">
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
      <div className="footer-content flex gap-x-3 lg:gap-x-8">
        {isLoggedIn && (
          <span
            className={'text-[#DDDDDD] hover:text-black uppercase cursor-pointer ease duration-300 hidden md:block'}
            onClick={() => setShowLightBox(true)}
          >
            <span className="text-[11px]">INFO</span>
          </span>
        )}
        <LinkItem link={ROUTES.PRIVACY} target="_self" classNames='hidden md:block'>
          <span className="text-[11px]">Privacy</span>
        </LinkItem>
        <LinkItem link={ROUTES.DISCLAIMER} classNames='hidden md:block'>
          <span className="text-[11px]">Disclaimer</span>
        </LinkItem>
        <LinkItem link="#">
          <span className="text-[11px] text-[#BBBBBB]">
            &copy; PRISM MARKETS {new Date().getFullYear()}
          </span>
        </LinkItem>
      </div>
    </div>
  );
};

export default FooterView;
