import { motion } from 'framer-motion';
import { FC } from 'react';

interface DotsNavProps {
  active: string | number;
  dotsArray: string[] | number[];
}

const DotsNav: FC<DotsNavProps> = ({ active, dotsArray }) => {
  const activeDotStyle = {
    border: '1px solid #C0C1C6',
    boxShador: `inset -1px 1px 2px rgba(137, 137, 137, 0.2), 
    inset 1px -1px 2px rgba(137, 137, 137, 0.2), 
    inset -1px -1px 2px rgba(255, 255, 255, 0.9), 
    inset 1px 1px 3px rgba(137, 137, 137, 0.9)`,
  };
  return (
    <div className="dotsNav-component w-full h-[3vw]">
      <ul className="dotsNav-ul flex flex-row gap-4 justify-center">
        {dotsArray.map((value) => {
          return (
            <li
              key={value}
              className="w-[1.5vw] h-[1.5vw] rounded-full bg-[#585a5e] relative"
            >
              {active === value ? (
                <motion.span
                  style={activeDotStyle}
                  layoutId="dots-navigation"
                  className="w-full h-full absolute rounded-full top-0 left-0 bg-white "
                />
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DotsNav;
