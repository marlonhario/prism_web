import { RegionCheckboxProps } from './RegionCheckbox.props';
import cn from 'classnames';

const RegionCheckboxView: React.FC<RegionCheckboxProps> = (
  props: RegionCheckboxProps
) => {
  const handleSelectRegion = () => (e: React.ChangeEvent<HTMLInputElement>) => {
    props.handleChange && props.handleChange(e.currentTarget.value);
  };

  return (
    <label
      className={cn(
        `region-toggle w-10`
      )}
    >
      <input
        type="checkbox"
        name="regions[]"
        className="opacity-0 w-0 h-0"
        value={props.region.value}
        ref={(el) => props.addToRef && props.addToRef(el as HTMLInputElement)}
        defaultChecked={props.defaultChecked}
        checked={props.checked}
        onChange={handleSelectRegion()}
      />
      <span className="cursor-pointer top-0 bottom-0 right-0 left-0 absolute rounded text-xs pt-0.5">
        {props.region.name}
      </span>
    </label>
  );
};

export default RegionCheckboxView;
