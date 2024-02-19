import React from "react";
import { IconProps } from "./Icon.props";

const ExpandIcon: React.FC<IconProps> = ({
  color = "currentColor",
  width = 16,
  height = 16,
  ...props
}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 38 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.944951 1.39177L19.3143 12.3391L37.6836 1.39177" stroke={color}/>
    </svg>
  );
};

export default ExpandIcon;
