import React from 'react';
import { CustomImageProps } from './CustomImage.props';

const CustomImage: React.FC<CustomImageProps> = (props: CustomImageProps) => (
  <img
    className={props?.className}
    src={props.src}
    width={props.width}
    alt={props.alt}
    onError={({ currentTarget }) => {
      currentTarget.onerror = null;
      currentTarget.src = props?.defaultPath ? props?.defaultPath : '';
      currentTarget.width = props?.defaultWidth ? props?.defaultWidth : 100;
    }}
    onClick={props?.onClick}
  />
);

export default CustomImage;
