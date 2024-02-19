import { CubeConfig } from 'components/NewCubeModel/config';

export const getInfoGraphicByPositionsMap = (positionStringArray: string[]) => {
  const infographics = CubeConfig.infographics.main;

  return Object.entries(infographics)
    .filter(([position]) => positionStringArray.includes(position))
    .map(([_position, objectValue]) => objectValue);
};
