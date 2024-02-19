import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import clsx from 'classnames';

import Introduction from './Introduction';
import EraOfInvesting from './EraOfInvesting';
import LeveragePower from './LeveragePower';
import HomeAnimation from '../../../pages/Home/Home.animations';

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}


const getOffset = (elem: HTMLDivElement) => {
  const { height } = elem.getBoundingClientRect();
  return {
    bottom: elem.offsetTop + height,
    top: elem.offsetTop,
  };
};

const IntroView: React.FC<
  { expanded?: boolean } & React.HTMLAttributes<HTMLDivElement>
> = ({ className, expanded = false, ...props }) => {
  const scrollViewRef = useRef<HTMLDivElement>(null);
  const eraOfInvesting = useRef<HTMLDivElement>(null);
  const [section, setSection] = useState<number>(-1);
  const [size, setSize] = useState<{ height: number; width: number }>({
    height: 0,
    width: 0,
  });
  const sectionRefs = [
    { name: 'Introduction', ref: Introduction },
    { name: 'Era of Investing', ref: EraOfInvesting },
    { name: 'Leverage Power', ref: LeveragePower },
  ];
	const [width, height] = useWindowSize();

  useEffect(() => {
    if (scrollViewRef?.current) {
      setSize({
        height: scrollViewRef.current.offsetHeight,
        width: scrollViewRef.current.offsetWidth,
      });
    }
  }, [scrollViewRef]);
  // TODO: Not sure if scrollIntoView will be require
  // const handleScrollIntoView =
  //   (index: number) => (e: React.MouseEvent<HTMLElement>) => {
  //     e.preventDefault();
  //     const sectionRef = sectionRefs[index]?.ref;
  //     if (sectionRef && sectionRef.current) {
  //       sectionRef.current.scrollIntoView({
  //         behavior: 'smooth',
  //         block: 'start',
  //         inline: 'nearest',
  //       });
  //     }
  //   };

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollElem = scrollViewRef.current;
  //     if (scrollElem) {
  //       const { offsetHeight, scrollTop, scrollHeight } = scrollElem;
  //       const endOfScrolling = scrollTop + offsetHeight === scrollHeight;
  //       const index = sectionRefs.findIndex(({ ref }) => {
  //         if (ref.current) {
  //           const { bottom, top } = getOffset(ref.current);
  //           return scrollTop > top && scrollTop < bottom;
  //         }
  //       });
  //       // Highlight current section
  //       if (section < index) setSection(index);
  //       if (endOfScrolling) {
  //         setSection(sectionRefs.length + 1);
  //       }
  //     }
  //   };

  //   scrollViewRef.current?.addEventListener('scroll', handleScroll, {
  //     passive: true,
  //   });
  //   return () => {
  //     scrollViewRef.current?.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  return (
    <div
      ref={scrollViewRef}
      className="w-full h-full overflow-x-hidden overflow-y-auto prism-scrollbar about-scrollbar"
    >
      <div className="w-full min-h-full h-auto ltr">
        {size.height > 0 && (
          <React.Fragment>
            {/* <Introduction
              className="introduction pl-12"
              style={{ minHeight: size.height }}
            />
            <EraOfInvesting
              ref={eraOfInvesting}
              className="relative flex justify-end h-auto w-full"
            />
            <LeveragePower
              className="flex items-center justify-center w-full h-auto bg-red-100"
              expanded={expanded}
              style={{ minHeight: size.height }}
            /> */}
            <HomeAnimation parentDimension={{width,height}}/>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default IntroView;
