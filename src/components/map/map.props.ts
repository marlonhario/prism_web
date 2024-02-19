export type MapImagePosition = 'top' | 'bottom';

export interface MapProps {
  name: string;
  imageUrl: string;
  compressedImage?: string;
  imagePosition?: MapImagePosition;
  active?: boolean;
}
