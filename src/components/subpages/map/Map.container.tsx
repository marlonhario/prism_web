import { useState } from 'react';
import { MapTypes } from './map.props';
import { MapView } from './Map.view';

export const MapContainer = () => {
  const [activeMap, setActiveMap] = useState<MapTypes>('london');

  return <MapView activeMap={activeMap} setActiveMap={setActiveMap} />;
};
