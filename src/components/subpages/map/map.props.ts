export type MapTypes = 'sydney' | 'london';

export interface MapProps {
  activeMap: MapTypes;
  setActiveMap: (map: MapTypes) => void;
}
