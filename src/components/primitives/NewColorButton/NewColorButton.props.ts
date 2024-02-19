import { Perspective } from 'components/NewCubeModel';

export interface NewColorButtonProps {
  eta: Perspective | undefined;
  width?: number;
  height?: number;
  className?: string;
  active?: boolean;
  onClick?(eta?: Perspective): void;
}