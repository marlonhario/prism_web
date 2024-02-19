export interface MaturitySliderProps {
  value: number;
  minValue?: number;
  maxValue?: number;
  step?: number;
  threshold?: number;
  showValue?: boolean;
  disable?: boolean;
  onChange(value: number): void;
}