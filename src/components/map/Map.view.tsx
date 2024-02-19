import { Image } from 'antd';
import { FC } from 'react';
import { motion } from 'framer-motion';

import { MapProps } from './map.props';
import './styles.scss';

export const Map: FC<MapProps> = ({
  name = '',
  imageUrl = '',
  imagePosition = 'bottom',
  active = true,
}) => {
  const classes = {
    active: {
      name: 'font-semibold text-[#343741] mt-0 mb-0',
    },
    inactive: {
      name: 'font-light text-[#C0C1C6] mt-0 mb-0',
    },
  };
  return (
    <div
      className={`map-image-wrapper w-full h-full relative flex ${
        imagePosition === 'bottom' ? 'items-end' : 'items-start'
      } `}
    >
      {active ? (
        <motion.div className="map-outline" layoutId="map-outline" />
      ) : null}
      {active ? null : (
        <motion.div className="map-outline-inactive" layoutId="map-inactive" />
      )}
      <div
        className={`flex w-full h-[90%] items-center relative gap-[12px] ${
          imagePosition === 'bottom' ? 'flex-col' : 'flex-col-reverse'
        } `}
      >
        <p
          className={`relative text-3xl tracking-[0.1em] text-center uppercase
          ${active ? classes.active.name : classes.inactive.name}
          ${imagePosition === 'bottom' ? 'bottom-6' : 'top-6'}`}
        >
          {name}
        </p>
        <Image
          className="object-cover"
          width="390px"
          src={imageUrl}
          preview={false}
        />
      </div>
    </div>
  );
};
