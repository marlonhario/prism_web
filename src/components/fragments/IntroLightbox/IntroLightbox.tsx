import { useContext, useState, useEffect } from 'react';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';

import IntroVideo from './IntroVideo';
import { ReactComponent as CloseLightbox } from 'assets/lightbox/close-btn.svg';
import { ReactComponent as RightArrow } from 'assets/lightbox/right-arrow.svg';
import { ReactComponent as LeftArrow } from 'assets/lightbox/left-arrow.svg';

import { AuthContext } from 'context/AuthContext';
import { LightboxMenu } from './IntroLightbox.props';

import './styles.scss';
import { Image, Spin } from 'antd';

const IntroLightboxView: React.FC = () => {
  const { setShowLightbox } = useContext(AuthContext);
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [[selectedItem, direction], setSelectedItem] = useState([0, 0]);

  const imageVariants = {
    enter: (direction: number) => {
      return {
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
  };

  /**
   * @description Sets the default tab of the lightbox depending on the page the user is in
   */
  useEffect(() => {
    if (localStorage.getItem('defaultLightBox')) {
      switch (localStorage.getItem('defaultLightBox')) {
        case 'Perspective':
          setSelectedMenu(2);
          setSelectedItem([0, 0]);
          break;
        case 'Optimiser':
          setSelectedMenu(0);
          setSelectedItem([0, 0]);
          break;
        case 'EtaMarkets':
          setSelectedMenu(0);
          setSelectedItem([0, 0]);
          break;
      }
    }
  }, []);

  return (
    <div className="introLightBox-component bg-[#000000d9] absolute top-0 h-full w-[100vw] z-[999999] flex flex-col gap-y-5 items-center">
      <AnimateSharedLayout>
        <div className="flex justify-center gap-x-10 font-din2014 text-sm font-bold text-[#C0C1C6] mt-7 flex-wrap gap-y-2">
          {LightboxMenu.map((menu, index) => (
            <span
              onClick={() => {
                setSelectedMenu(index);
                setSelectedItem([0, selectedMenu > index ? 1 : -1]);
              }}
              className={`cursor-pointer select-none uppercase highlight-on-hover ${
                selectedMenu === index ? 'text-white' : ''
              }`}
              key={index}
            >
              {menu.menu}
            </span>
          ))}
        </div>
        <div
          className={`w-11/12 h-5/6 bg-transparent flex justify-center gap-x-20 ${
            LightboxMenu[selectedMenu].content[selectedItem].type === 'video'
              ? 'items-center sm:items-stretch'
              : ''
          }`}
        >
          {(selectedMenu !== 0 || selectedItem !== 0) && (
            <LeftArrow
              className="absolute left-6 z-[51] self-center cursor-pointer highlight-on-hover w-8 sm:w-auto"
              onClick={() => {
                if (selectedItem > 0) {
                  setSelectedItem(([prevItem]) => [prevItem - 1, 1]);
                } else {
                  setSelectedMenu((prev) => prev - 1);
                  setSelectedItem([
                    LightboxMenu[selectedMenu - 1].content.length - 1,
                    1,
                  ]);
                }
              }}
            />
          )}
          <div
            className={`flex justify-center relative items-center ${
              LightboxMenu[selectedMenu].content[selectedItem].type === 'img'
                ? `w-full`
                : `absolute w-inherit sm:w-auto sm:relative`
            }`}
          >
            <AnimatePresence initial={false} custom={direction}>
              {LightboxMenu[selectedMenu].content[selectedItem].type ===
              'img' ? (
                <motion.div
                  variants={imageVariants}
                  custom={direction}
                  className="h-auto sm:h-full w-auto absolute"
                  key={LightboxMenu[selectedMenu].content[selectedItem].src}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: {
                      type: 'spring',
                      stiffness: 300,
                      damping: 40,
                    },
                    opacity: { duration: 0.3 },
                  }}
                >
                  <CloseLightbox
                    className={`absolute top-[-18px] right-[-18px] cursor-pointer z-[54] highlight-on-hover`}
                    onClick={() => {
                      setShowLightbox(false);
                    }}
                  />
                  <Image
                    rootClassName="lb-slider-image-root"
                    preview={false}
                    src={LightboxMenu[selectedMenu].content[selectedItem].src}
                    alt="Lightbox Test"
                    className="w-full h-auto sm:!h-full select-none"
                    placeholder={
                      <div className="lb-image-placeholder">
                        <div className="lb-image-placeholder-blur" />
                        <Spin size="large" />
                      </div>
                    }
                  />
                </motion.div>
              ) : (
                <>
                  <IntroVideo
                    src={LightboxMenu[selectedMenu].content[selectedItem].src}
                    thumbnail={
                      LightboxMenu[selectedMenu].content[selectedItem].thumbnail
                    }
                  />
                  <CloseLightbox
                    className={`absolute top-[-18px] right-[-18px] cursor-pointer z-[54] highlight-on-hover`}
                    onClick={() => {
                      setShowLightbox(false);
                    }}
                  />
                </>
              )}
            </AnimatePresence>
          </div>
          {(selectedMenu !== LightboxMenu.length - 1 ||
            selectedItem !== LightboxMenu[selectedMenu].content.length - 1) && (
            <RightArrow
              className="absolute right-6 z-[51] self-center cursor-pointer highlight-on-hover w-8 sm:w-auto"
              onClick={() => {
                if (
                  selectedItem <
                  LightboxMenu[selectedMenu].content.length - 1
                ) {
                  setSelectedItem(([prevItem]) => [prevItem + 1, -1]);
                } else {
                  setSelectedMenu((prev) => prev + 1);
                  setSelectedItem([0, -1]);
                }
              }}
            />
          )}
        </div>
        {LightboxMenu[selectedMenu].hasFooter && (
          <div className="flex justify-center gap-x-5 gap-y-2 pb-3 flex-wrap font-din2014 text-sm font-bold text-white">
            {LightboxMenu[selectedMenu].content.map((content, index) => (
              <span
                className={`relative border border-[#C0C1C6] text-sm w-[30px] h-[30px] cursor-pointer select-none highlight-on-hover inline-flex justify-center items-center`}
                onClick={() => {
                  setSelectedItem(([prevItem]) => [
                    index,
                    prevItem < index ? -1 : 1,
                  ]);
                }}
                key={index}
              >
                {index + 1}
                {selectedItem === index ? (
                  <motion.span
                    layoutId="lightbox-selected-image"
                    className="w-full h-full absolute top-0 left-0 bg-white bg-opacity-30"
                  />
                ) : null}
              </span>
            ))}
          </div>
        )}
      </AnimateSharedLayout>
    </div>
  );
};

export default IntroLightboxView;
