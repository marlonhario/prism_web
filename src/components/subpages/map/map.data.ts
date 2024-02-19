import { MapTypes } from './map.props';

export const MAPS = {
  SYDNEY: 'sydney' as MapTypes,
  LONDON: 'london' as MapTypes,
};

export const mapList = [
  {
    name: MAPS.LONDON,
    contact: {
      address: 'Level 35B, Tower 42, 25 Old Broad Street, London EC2N 1HQ',
      phone: '+44 8000 584 888',
      email: 'info@prism.markets',
    },
    wrapperClass: 'top-[-62px]',
    imagePosition: 'bottom',
    imageUrl: 'images/maps/map_london.png',
  },
  {
    name: MAPS.SYDNEY,
    contact: {
      address: 'Level 14, 167 Macquarie St, Sydney, NSW, 2000',
      phone: '+61 1800 977 476',
      email: 'info@prism.markets',
    },
    wrapperClass: 'top-6',
    imagePosition: 'top',
    imageUrl: 'images/maps/map_sydney.png',
  },
];
