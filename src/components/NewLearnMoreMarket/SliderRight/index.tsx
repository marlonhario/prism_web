import { useEffect, useRef } from 'react';

import { SliderProps } from '../types';
import { SliderRightArrowIcon } from '../icons';
import './index.scss';

export function SliderRight({
  value,
  minValue,
  maxValue,
  threshold,
  onChange,
  style,
}: SliderProps) {
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
    <div className={'learn-more-market-slider-right'} style={style}>
      <input
        type={'range'}
        value={value}
        min={minValue}
        max={maxValue}
        step={0.01}
        className={'learn-more-market-slider-right-input'}
        onChange={({ target: { value } }) => handleChange(Number(value))}
      />

      <div
        ref={trackRef}
        className={'learn-more-market-slider-right-track'}
      >
        <div className={'learn-more-market-slider-right-trackThumb'}>
          <div className={'learn-more-market-slider-right-trackThumb-pointer'}>
            <SliderRightArrowIcon fill={'#ffffff'} />
          </div>
        </div>
      </div>

      <div className={'learn-more-market-slider-right-range'} />
    </div>
  );
}