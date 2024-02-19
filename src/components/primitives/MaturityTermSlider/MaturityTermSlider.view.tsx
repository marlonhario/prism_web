import { useEffect, useRef } from 'react';

import { MaturitySliderProps } from './MaturityTermSlider.props';
import './MaturityTermSlider.scss';

export default function MaturityTermSlider({
  value,
  minValue = 0,
  maxValue = 100,
  step,
  threshold,
  showValue,
  disable = false,
  onChange
}: MaturitySliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tractEl = trackRef.current;

    if (tractEl) {
      const percentage = (value - minValue) / (maxValue - minValue) * 100;
      tractEl.style.width = `${percentage}%`;
    }
  }, [minValue, maxValue, value]);

  const handleChange = (value: number) => {
    const nextThreshold = threshold || 0;
    const nextMinValue = minValue + nextThreshold;
    const nextMaxValue = maxValue - nextThreshold;

    if (
      value >= nextMinValue &&
      value <= nextMaxValue
    ) {
      onChange(value);
    }
  }

  return (
    <div className={'maturity-term-slider'}>
      <input
        type={'range'}
        value={value}
        min={minValue}
        max={maxValue}
        step={step}
        disabled={disable}
        className={'maturity-term-slider-input'}
        onChange={({ target: { value } }) => handleChange(Number(value))}
      />

      <div
        ref={trackRef}
        className={'maturity-term-slider-track absolute inset-0'}
      >
        <span className={'maturity-term-slider-track-thumb font-bold flex items-center justify-center leading-[25px] text-[11px] text-[#474C55] tracking-tighter'}>
          {showValue && value}
        </span>
      </div>

      <div className={'maturity-term-slider-range absolute inset-0'} />
    </div>
  );
}