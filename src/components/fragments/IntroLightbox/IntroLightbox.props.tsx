import LightboxTest from 'assets/lightbox/light-box-test.jpg';
import VideoThumbnail from 'assets/lightbox/video-thumbnail.png';
import PrismAllocations_SEP22_v11 from 'assets/lightbox/deck/PrismAllocations_SEP22_v11.jpg';
import PrismAllocations_SEP22_v112 from 'assets/lightbox/deck/PrismAllocations_SEP22_v112.jpg';
import PrismAllocations_SEP22_v113 from 'assets/lightbox/deck/PrismAllocations_SEP22_v113.jpg';
import PrismAllocations_SEP22_v114 from 'assets/lightbox/deck/PrismAllocations_SEP22_v114.jpg';
import PrismAllocations_SEP22_v115 from 'assets/lightbox/deck/PrismAllocations_SEP22_v115.jpg';
import PrismAllocations_SEP22_v116 from 'assets/lightbox/deck/PrismAllocations_SEP22_v116.jpg';
import PrismAllocations_SEP22_v117 from 'assets/lightbox/deck/PrismAllocations_SEP22_v117.jpg';
import PrismAllocations_SEP22_v118 from 'assets/lightbox/deck/PrismAllocations_SEP22_v118.jpg';
import PrismAllocations_SEP22_v119 from 'assets/lightbox/deck/PrismAllocations_SEP22_v119.jpg';
import PrismAllocations_SEP22_v1110 from 'assets/lightbox/deck/PrismAllocations_SEP22_v1110.jpg';
import PrismAllocations_SEP22_v1111 from 'assets/lightbox/deck/PrismAllocations_SEP22_v1111.jpg';
import PrismAllocations_SEP22_v1112 from 'assets/lightbox/deck/PrismAllocations_SEP22_v1112.jpg';
import PrismAllocations_SEP22_v1113 from 'assets/lightbox/deck/PrismAllocations_SEP22_v1113.jpg';
import PrismAllocations_SEP22_v1114 from 'assets/lightbox/deck/PrismAllocations_SEP22_v1114.jpg';
import PrismAllocations_SEP22_v1115 from 'assets/lightbox/deck/PrismAllocations_SEP22_v1115.jpg';
import PrismAllocations_SEP22_v1116 from 'assets/lightbox/deck/PrismAllocations_SEP22_v1116.jpg';
import PrismAllocations_SEP22_v1117 from 'assets/lightbox/deck/PrismAllocations_SEP22_v1117.jpg';
import PrismAllocations_SEP22_v1118 from 'assets/lightbox/deck/PrismAllocations_SEP22_v1118.jpg';
import PrismAllocations_SEP22_v1119 from 'assets/lightbox/deck/PrismAllocations_SEP22_v1119.jpg';
import PrismAllocations_SEP22_v1120 from 'assets/lightbox/deck/PrismAllocations_SEP22_v1120.jpg';
import PrismAllocations_SEP22_v1121 from 'assets/lightbox/deck/PrismAllocations_SEP22_v1121.jpg';
import PrismAllocations_SEP22_v1122 from 'assets/lightbox/deck/PrismAllocations_SEP22_v1122.jpg';
import PrismAllocations_SEP22_v1123 from 'assets/lightbox/deck/PrismAllocations_SEP22_v1123.jpg';
import share_1 from 'assets/lightbox/deck/share_1.png';
import share_2 from 'assets/lightbox/deck/share_2.png';
import share_3 from 'assets/lightbox/deck/share_3.png';
import share_4 from 'assets/lightbox/deck/share_4.png';
import share_5 from 'assets/lightbox/deck/share_5.png';
import share_6 from 'assets/lightbox/deck/share_6.png';
import share_7 from 'assets/lightbox/deck/share_7.png';
import share_8 from 'assets/lightbox/deck/share_8.png';
import share_9 from 'assets/lightbox/deck/share_9.png';

import MarketsTabPage1 from 'assets/lightbox/markets/page-1.png';
import MarketsTabPage2 from 'assets/lightbox/markets/page-2.png';

import optimiserImage_1 from 'assets/lightbox/deck/optimiser_1.jpg';
import optimiserImage_2 from 'assets/lightbox/deck/optimiser_2.jpg';
import optimiserImage_3 from 'assets/lightbox/deck/optimiser_3.jpg';

import Frame1 from 'assets/lightbox/intro/Frame1.jpg';
import Frame2 from 'assets/lightbox/intro/Frame2.jpg';
import Frame3 from 'assets/lightbox/intro/Frame3.jpg';
import Frame4 from 'assets/lightbox/intro/Frame4.png';
import Frame5 from 'assets/lightbox/intro/Frame5.jpg';
import Frame6 from 'assets/lightbox/intro/Frame6.jpg';
import Frame7 from 'assets/lightbox/intro/Frame7.jpg';
import Frame8 from 'assets/lightbox/intro/Frame8.jpg';
import Frame9 from 'assets/lightbox/intro/Frame9.jpg';
import Frame10 from 'assets/lightbox/intro/Frame10.jpg';
import Frame11 from 'assets/lightbox/intro/Frame11.jpg';
import Frame12 from 'assets/lightbox/intro/Frame12.jpg';

export interface LightboxMedia {
  src: string;
  type: 'img' | 'video';
  thumbnail?: string;
}

export interface LightboxMenuInterface {
  menu: string;
  hasFooter: boolean;
  content: LightboxMedia[];
}

export const LightboxMenu: LightboxMenuInterface[] = [
  {
    menu: 'Video',
    hasFooter: false,
    content: [
      {
        src: 'https://staging-prism-markets.s3.ap-southeast-2.amazonaws.com/assets/video/Prism_Brand_Video.mp4',
        type: 'video',
        thumbnail: VideoThumbnail,
      },
    ],
  },
  {
    menu: 'Intro',
    hasFooter: true,
    content: [
      {
        src: Frame1,
        type: 'img',
      },
      {
        src: Frame2,
        type: 'img',
      },
      {
        src: Frame3,
        type: 'img',
      },
      {
        src: Frame4,
        type: 'img',
      },
      {
        src: Frame5,
        type: 'img',
      },
      {
        src: Frame6,
        type: 'img',
      },
      {
        src: Frame7,
        type: 'img',
      },
      {
        src: Frame8,
        type: 'img',
      },
      {
        src: Frame9,
        type: 'img',
      },
      {
        src: Frame10,
        type: 'img',
      },
      {
        src: Frame11,
        type: 'img',
      },
      {
        src: Frame12,
        type: 'img',
      },
    ],
  },
  {
    menu: 'Deck',
    hasFooter: true,
    content: [
      {
        src: PrismAllocations_SEP22_v11,
        type: 'img',
      },
      {
        src: PrismAllocations_SEP22_v112,
        type: 'img',
      },
      {
        src: PrismAllocations_SEP22_v113,
        type: 'img',
      },
      {
        src: PrismAllocations_SEP22_v114,
        type: 'img',
      },
      {
        src: PrismAllocations_SEP22_v115,
        type: 'img',
      },
      {
        src: PrismAllocations_SEP22_v116,
        type: 'img',
      },
      {
        src: PrismAllocations_SEP22_v117,
        type: 'img',
      },
      {
        src: PrismAllocations_SEP22_v118,
        type: 'img',
      },
      {
        src: PrismAllocations_SEP22_v119,
        type: 'img',
      },
      {
        src: PrismAllocations_SEP22_v1110,
        type: 'img',
      },
      {
        src: PrismAllocations_SEP22_v1111,
        type: 'img',
      },
      {
        src: PrismAllocations_SEP22_v1112,
        type: 'img',
      },
      {
        src: PrismAllocations_SEP22_v1113,
        type: 'img',
      },
      {
        src: PrismAllocations_SEP22_v1114,
        type: 'img',
      },
      {
        src: PrismAllocations_SEP22_v1115,
        type: 'img',
      },
      {
        src: PrismAllocations_SEP22_v1116,
        type: 'img',
      },
      {
        src: PrismAllocations_SEP22_v1117,
        type: 'img',
      },
      {
        src: PrismAllocations_SEP22_v1118,
        type: 'img',
      },
      {
        src: PrismAllocations_SEP22_v1119,
        type: 'img',
      },
      {
        src: PrismAllocations_SEP22_v1120,
        type: 'img',
      },
      {
        src: PrismAllocations_SEP22_v1121,
        type: 'img',
      },
      {
        src: PrismAllocations_SEP22_v1122,
        type: 'img',
      },
      {
        src: PrismAllocations_SEP22_v1123,
        type: 'img',
      },
    ],
  },
  // {
  //   menu: 'Share',
  //   hasFooter: true,
  //   content: [
  //     {
  //       src: share_1,
  //       type: 'img',
  //     },
  //     {
  //       src: share_2,
  //       type: 'img',
  //     },
  //     {
  //       src: share_3,
  //       type: 'img',
  //     },
  //     {
  //       src: share_4,
  //       type: 'img',
  //     },
  //     {
  //       src: share_5,
  //       type: 'img',
  //     },
  //     {
  //       src: share_6,
  //       type: 'img',
  //     },
  //     {
  //       src: share_7,
  //       type: 'img',
  //     },
  //     {
  //       src: share_8,
  //       type: 'img',
  //     },
  //     {
  //       src: share_9,
  //       type: 'img',
  //     },
  //   ],
  // },
  // {
  //   menu: 'Optimiser',
  //   hasFooter: true,
  //   content: [
  //     {
  //       src: optimiserImage_1,
  //       type: 'img',
  //     },
  //     {
  //       src: optimiserImage_2,
  //       type: 'img',
  //     },
  //     {
  //       src: optimiserImage_3,
  //       type: 'img',
  //     },
  //   ],
  // },
  // {
  //   menu: 'Markets',
  //   hasFooter: true,
  //   content: [
  //     {
  //       src: MarketsTabPage1,
  //       type: 'img',
  //     },
  //     {
  //       src: MarketsTabPage2,
  //       type: 'img',
  //     },
  //   ],
  // },
];
