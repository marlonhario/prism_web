import React from 'react';
import classNames from 'classnames';
import { Tab } from '@headlessui/react';
import { Link } from 'react-router-dom';

const TabItemView: React.FC<{ active: boolean; name: string; handleClick: () => void }> = ({
  active,
  name,
  handleClick
}) => (
  <Tab className={classNames("w-1/4", { active: active })} onClick={handleClick}>
    <span
      className={`
        nav-link
        block
        uppercase
        focus:border-transparent
        text-base
        font-light sm:font-normal
        hover:text-white
        tracking-[0.03em] sm:tracking-normal
        ${active ? '!text-[#5F6369] sm:text-white' : 'text-[#343741]'}
      `}
      role="tab"
    >
      {name}
    </span>
  </Tab>
);
export default TabItemView;
