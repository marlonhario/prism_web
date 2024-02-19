import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  fillColor?: boolean;
  height?: number | string;
  width?: number | string;
  variant?: 'outline' | 'solid';
}
