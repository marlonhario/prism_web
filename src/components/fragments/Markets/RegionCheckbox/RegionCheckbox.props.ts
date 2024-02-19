export interface RegionCheckboxProps {
  region: {
    name: string;
    value: string;
  };
  checked?: boolean;
  defaultChecked?: boolean;
  addToRef?: (el: HTMLInputElement) => void;
  handleChange?: (value: string) => void;
}
