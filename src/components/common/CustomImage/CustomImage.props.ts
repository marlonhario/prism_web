export interface CustomImageProps {
  className?: string;
  src: string;
  width: string;
  alt: string;
  defaultPath?: string;
  defaultWidth?: number;
  onClick?: () => void;
}
