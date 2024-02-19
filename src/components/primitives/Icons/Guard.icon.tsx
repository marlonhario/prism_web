import React from "react";
import { IconProps } from "./Icon.props";

import { ETATypes } from "common/types";

type ETAGradientColors = { [key: string]: string[] }

const LinearGradient: ETAGradientColors = {
  GrowthGuard: ['#A94447', '#551919'],
  DivGuard: ['#426299', '#1A2741']
}

const RadialGradient: ETAGradientColors = {
  GrowthGuard: ['#FCF4ED', '#C1ABA0'],
  DivGuard: ['#CBEBF7', '#B1D6E8']
}

const ExpandIcon: React.FC<{ className?: string, etaName: ETATypes } & IconProps> = ({
  color = "currentColor",
  className = '',
  etaName = 'GrowthGuard',
  width = 35,
  height = 43,
  ...props
}) => {
  const linearGradient = LinearGradient[etaName];
  const radialGradient = RadialGradient[etaName];
  return (
    <svg width={width} height={height} viewBox="0 0 35 43" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_iiii_1733_4794)">
      <path d="M17.5 4L32 8.73261V16.4125C32 25.6146 26.9447 34.0728 18.8401 38.4309L17.5 39.1515L16.1599 38.4309C8.05526 34.0728 3 25.6146 3 16.4125V8.73261L17.5 4Z" fill="url(#paint0_linear_1733_4794)"/>
      <path d="M17.5 4L32 8.73261V16.4125C32 25.6146 26.9447 34.0728 18.8401 38.4309L17.5 39.1515L16.1599 38.4309C8.05526 34.0728 3 25.6146 3 16.4125V8.73261L17.5 4Z" fill="url(#paint1_radial_1733_4794)" fill-opacity="0.2"/>
      </g>
      <path d="M17.9654 2.57403L17.5 2.42213L17.0346 2.57403L2.53458 7.30664L1.5 7.64432V8.73261V16.4125C1.5 26.1667 6.85858 35.1324 15.4495 39.752L16.7896 40.4726L17.5 40.8546L18.2104 40.4726L19.5505 39.752C28.1414 35.1324 33.5 26.1667 33.5 16.4125V8.73261V7.64432L32.4654 7.30664L17.9654 2.57403Z" stroke="url(#paint2_radial_1733_4794)" stroke-width="3"/>
      <defs>
      <filter id="filter0_iiii_1733_4794" x="-1" y="-0.155762" width="37" height="43.7135" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood floodOpacity="0" result="BackgroundImageFix"/>
      <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dx="1" dy="-1"/>
      <feGaussianBlur stdDeviation="1.5"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.478431 0 0 0 0 0.192157 0 0 0 0 0.2 0 0 0 0.9 0"/>
      <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1733_4794"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dx="-1" dy="1"/>
      <feGaussianBlur stdDeviation="1"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.847059 0 0 0 0 0.341176 0 0 0 0 0.356863 0 0 0 0.9 0"/>
      <feBlend mode="normal" in2="effect1_innerShadow_1733_4794" result="effect2_innerShadow_1733_4794"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dx="1" dy="1"/>
      <feGaussianBlur stdDeviation="1"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.478431 0 0 0 0 0.192157 0 0 0 0 0.2 0 0 0 0.2 0"/>
      <feBlend mode="normal" in2="effect2_innerShadow_1733_4794" result="effect3_innerShadow_1733_4794"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feOffset dx="-1" dy="-1"/>
      <feGaussianBlur stdDeviation="1"/>
      <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.478431 0 0 0 0 0.192157 0 0 0 0 0.2 0 0 0 0.2 0"/>
      <feBlend mode="normal" in2="effect3_innerShadow_1733_4794" result="effect4_innerShadow_1733_4794"/>
      </filter>
      <linearGradient id="paint0_linear_1733_4794" x1="3" y1="11.989" x2="24.5905" y2="31.3405" gradientUnits="userSpaceOnUse">
      <stop stopColor={linearGradient[0]} />
      <stop offset="1" stopColor={linearGradient[1]} />
      </linearGradient>
      <radialGradient id="paint1_radial_1733_4794" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(3 9.5) rotate(39.8056) scale(19.5256 16.1086)">
      <stop stopColor="white"/>
      <stop offset="1" stopColor="white" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="paint2_radial_1733_4794" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(7.02778 10.3912) rotate(69.9924) scale(30.6076 25.2026)">
      <stop stopColor={radialGradient[0]} />
      <stop offset="1" stopColor={radialGradient[1]} />
      </radialGradient>
      </defs>
    </svg>
  );
};

export default ExpandIcon;
