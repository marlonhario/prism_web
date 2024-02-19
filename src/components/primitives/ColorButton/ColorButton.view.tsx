import React, { useState } from 'react';

import CubeBlue from 'assets/images/cube-blue.png';
import CubeRed from 'assets/images/cube-red.png';
import CubeGreen from 'assets/images/cube-green.png';
import { ETAPairing } from 'common/types';

const RGBColors = {
  Red: ['#A94447', '#551919'],
  Green: ['#3D8E74', '#205544'],
  Blue: ['#426299', '#1A2741'],
  Purple: ['#426299', '#1A2741'],
};

const imageCube = (color: string) => {
  switch (color) {
    case 'Blue':
      return CubeBlue;
    case 'Green':
      return CubeGreen;
    default:
      return CubeRed;
  }
};

const ColorButton: React.FC<{
  active?: boolean;
  color: ETAPairing;
  width?: number;
  height?: number;
  onClick?: (e: React.MouseEvent) => void;
}> = ({ active = false, color = 'Red', width = 26, height = 30, onClick }) => {
  const [focus, setFocus] = useState<boolean>(false);

  return (
    <button
      aria-hidden="true"
      className="cursor-pointer"
      style={{
        outline: 'none',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onClick={onClick}
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      {active && (
        <img
          src={imageCube(color)}
          alt={color}
          style={{ position: 'absolute', top: 'calc(50% + 1px)', left: 'calc(50% + 1px)', height: '84%', transform: 'translate(-50%, -50%)' }}
        />
      )}
      <svg width={width} height={height} viewBox="0 0 29 33" fill="none">
        <path
          d="M14.9379 1.32454C15.2857 1.12371 15.7143 1.12371 16.0621 1.32454L29.2273 8.92546C29.5751 9.12629 29.7894 9.49743 29.7894 9.89907V25.1009C29.7894 25.5026 29.5751 25.8737 29.2273 26.0745L16.0621 33.6755C15.7143 33.8763 15.2857 33.8763 14.9379 33.6755L1.7727 26.0745C1.42486 25.8737 1.21058 25.5026 1.21058 25.1009V9.89907C1.21058 9.49743 1.42486 9.12629 1.77269 8.92546L14.9379 1.32454Z"
          stroke={focus || active ? RGBColors[color][0] : '#C0C1C6'}
          strokeWidth={focus || active ? 1.5 : 0.5}
        />
        <text
          fontWeight="normal"
          xmlSpace="preserve"
          textAnchor="start"
          fontSize="18"
          id="svg_2"
          y="23.0757"
          x="9.76887"
          strokeWidth="0"
          stroke="#000"
          fill="#ffffff"
        >
          {color?.charAt(0)}
        </text>
        <g opacity="0.3">
          <path
            d="M2.94238 10.25L15.4996 17.5V32L2.94238 24.75V10.25L15.4996 17.5L2.94238 10.25Z"
            fill="url(#paint0_linear_2442_10324)"
          />
          <path
            d="M28.0569 10.25L15.4996 3L2.94238 10.25L15.4996 17.5L28.0569 10.25Z"
            fill="url(#paint1_linear_2442_10324)"
          />
          <path
            d="M15.5 17.5V32L28.0572 24.75V10.25L15.5 17.5Z"
            fill="url(#paint2_linear_2442_10324)"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_2442_10324"
            x1="14.8598"
            y1="18.0363"
            x2="3.42843"
            y2="24.2978"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.02" stopColor="#FCFCFC" />
            <stop offset="0.08" stopColor="#E5E5E5" />
            <stop offset="0.18" stopColor="#C5C5C5" />
            <stop offset="0.28" stopColor="#ABABAB" />
            <stop offset="0.39" stopColor="#999999" />
            <stop offset="0.51" stopColor="#8E8E8E" />
            <stop offset="0.64" stopColor="#8B8B8B" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_2442_10324"
            x1="2.94238"
            y1="10.25"
            x2="28.0572"
            y2="10.25"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.34" stopColor="#FAFAFA" />
            <stop offset="0.4" stopColor="#F3F3F3" />
            <stop offset="0.76" stopColor="#D0D0D0" />
            <stop offset="0.95" stopColor="#C2C2C2" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_2442_10324"
            x1="17.2786"
            y1="16.7793"
            x2="26.7523"
            y2="25.9278"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.26" stopColor="#8E8E8E" />
            <stop offset="0.36" stopColor="#969696" />
            <stop offset="0.53" stopColor="#AEAEAE" />
            <stop offset="0.74" stopColor="#D3D3D3" />
            <stop offset="0.87" stopColor="#EEEEEE" />
          </linearGradient>
        </defs>
      </svg>

      {/* <svg width={width} height={height} viewBox="0 0 29 33" fill="none">
        {active ? (
          <>
            <path
              d="M14 -0.00012207L27.4977 7.79282V23.3787L14 31.1717L0.502175 23.3787V7.79282L14 -0.00012207Z"
              fill="url(#paint0_linear_1733_4937)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1733_4937"
                x1="29.5858"
                y1="20.4904"
                x2="0.521946"
                y2="24.7971"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor={RGBColors[color][0]} />
                <stop offset="1" stopColor={RGBColors[color][1]} />
              </linearGradient>
            </defs>
          </>
        ) : (
          <>
            <path
              d="M13.8057 1.45044C14.2885 1.17171 14.8833 1.1717 15.3661 1.45043L27.3035 8.34251C27.7863 8.62124 28.0837 9.13635 28.0837 9.69381V23.478C28.0837 24.0354 27.7863 24.5505 27.3035 24.8293L15.3661 31.7213C14.8833 32.0001 14.2885 32.0001 13.8057 31.7213L1.86829 24.8293C1.38552 24.5505 1.08811 24.0354 1.08811 23.478V9.69381C1.08811 9.13635 1.38551 8.62124 1.86829 8.34251L13.8057 1.45044Z"
              fill={RGBColors[color][0]}
              fillOpacity={focus ? 0.5 : 0.15}
            />
            <path
              d="M13.8057 1.45044C14.2885 1.17171 14.8833 1.1717 15.3661 1.45043L27.3035 8.34251C27.7863 8.62124 28.0837 9.13635 28.0837 9.69381V23.478C28.0837 24.0354 27.7863 24.5505 27.3035 24.8293L15.3661 31.7213C14.8833 32.0001 14.2885 32.0001 13.8057 31.7213L1.86829 24.8293C1.38552 24.5505 1.08811 24.0354 1.08811 23.478V9.69381C1.08811 9.13635 1.38551 8.62124 1.86829 8.34251L13.8057 1.45044Z"
              fill="url(#paint0_radial_1733_5087)"
              fillOpacity={focus ? 0.8 : 0.3}
            />
            <path
              d="M13.8057 1.45044C14.2885 1.17171 14.8833 1.1717 15.3661 1.45043L27.3035 8.34251C27.7863 8.62124 28.0837 9.13635 28.0837 9.69381V23.478C28.0837 24.0354 27.7863 24.5505 27.3035 24.8293L15.3661 31.7213C14.8833 32.0001 14.2885 32.0001 13.8057 31.7213L1.86829 24.8293C1.38552 24.5505 1.08811 24.0354 1.08811 23.478V9.69381C1.08811 9.13635 1.38551 8.62124 1.86829 8.34251L13.8057 1.45044Z"
              stroke={RGBColors[color][0]}
              strokeWidth={focus ? 1 : 0.5}
            />
            <defs>
              <radialGradient
                id="paint0_radial_1733_5087"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(1.31682 3.93647) rotate(47.0586) scale(52.4554 91.1122)"
              >
                <stop stopColor="white" />
                <stop offset="1" stopOpacity="0" />
              </radialGradient>
            </defs>
          </>
        )}
        <text
          fontWeight="normal"
          xmlSpace="preserve"
          textAnchor="start"
          fontSize="18"
          id="svg_2"
          y="22.0757"
          x="8.76887"
          strokeWidth="0"
          stroke="#000"
          fill="#ffffff"
        >
          {color?.charAt(0)}
        </text>
      </svg> */}
    </button>
  );
};

export default ColorButton;
