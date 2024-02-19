import { Map } from 'components/map';
import { MapImagePosition } from 'components/map/map.props';
import { AnimateSharedLayout, motion } from 'framer-motion';
import { FC } from 'react';
import { mapList } from './map.data';
import { MapProps } from './map.props';
import './index.scss';

export const MapView: FC<MapProps> = ({ activeMap, setActiveMap }) => {
  const mapTextAnimation = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.1 },
  };
  return (
    <div className="map-container flex flex-row relative w-[501px] h-[501px] font-din2014 top-[24px]">
      <AnimateSharedLayout>
        {mapList.map((mapDetails) => (
          <div
            key={mapDetails.name}
            className={`absolute w-full h-full flex flex-col-reverse ${activeMap === mapDetails.name ? 'z-1' : 'z-0'
              } ${mapDetails.wrapperClass}`}
          >
            {mapDetails.imagePosition === 'top' &&
              mapDetails.name === activeMap ? (
              <motion.div
                {...mapTextAnimation}
                className="map-text map-text-top text-center absolute bottom-[-72px] left-0 right-0 z-30"
              >
                <p className="font-light text-base tracking-wide text-white mb-0">
                  {mapDetails.contact.address}
                </p>
                <p className="font-light text-base tracking-wide text-white">
                  <strong className="font-bold">T</strong>{' '}
                  {mapDetails.contact.phone} •{' '}
                  <strong className="font-bold">E</strong>{' '}
                  {mapDetails.contact.email}
                </p>
              </motion.div>
            ) : null}
            <div
              className="w-full h-full cursor-pointer"
              onClick={() => setActiveMap(mapDetails.name)}
            >
              <Map
                name={mapDetails.name}
                imageUrl={mapDetails.imageUrl}
                imagePosition={mapDetails.imagePosition as MapImagePosition}
                active={activeMap === mapDetails.name}
              />
            </div>
            {mapDetails.imagePosition === 'bottom' &&
              mapDetails.name === activeMap ? (
              <motion.div
                {...mapTextAnimation}
                className="map-text  map-text-bot text-center absolute top-[-66px] left-0 right-0 z-30"
              >
                <p className="font-light text-base tracking-wide text-white mb-0">
                  {mapDetails.contact.address}
                </p>
                <p className="font-light text-base tracking-wide text-white">
                  <strong className="font-bold">T</strong>{' '}
                  {mapDetails.contact.phone} •{' '}
                  <strong className="font-bold">E</strong>{' '}
                  {mapDetails.contact.email}
                </p>
              </motion.div>
            ) : null}
          </div>
        ))}
      </AnimateSharedLayout>
    </div>
  );
};
