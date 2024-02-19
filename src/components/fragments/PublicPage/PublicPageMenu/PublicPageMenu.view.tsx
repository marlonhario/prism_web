import { useState } from 'react';
import { PublicPageMenuProps } from './PublicPageMenu.props';
import './styles.scss';

const PublicPageMenuView: React.FC<PublicPageMenuProps> = (
  props: PublicPageMenuProps
) => {
  const [activeContent, setActiveContent] = useState(0)

  return (
    <>
      <h2 className="uppercase text-white text-2xl font-bold">{props.title}</h2>
      <ul className="text-white uppercase text-base w-3/4">
        {props.menu.map((menu, i) => {
          return (
            <li
              key={i}
              className={`cursor-pointer font-light mb-2 ${activeContent === i ? 'active-content' : ''} hover:underline`}
              onClick={() => {
                props.scrollToContent(i);
                setActiveContent(i)
              }}
            >
              {menu}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default PublicPageMenuView;
