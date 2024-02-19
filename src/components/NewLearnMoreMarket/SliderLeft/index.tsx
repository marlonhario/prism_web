import { useEffect, useRef } from 'react';

import { SliderProps } from '../types';
import { SliderLeftArrowIcon } from '../icons';
import './index.scss';

export function SliderLeft({
  value,
  minValue,
  maxValue,
  threshold,
  iconFill,
  flip,
  style,
  trackThumbPointerStyle,
  onChange
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
    <div className={`learn-more-market-slider-left ${flip ? 'flip' : ''}`} style={style}>
      <input
        type={'range'}
        value={value}
        min={minValue}
        max={maxValue}
        step={maxValue / 100}
        className={'learn-more-market-slider-left-input'}
        onChange={({ target: { value } }) => handleChange(Number(value))}
      />

      <div
        ref={trackRef}
        className={'learn-more-market-slider-left-track'}
      >
        <div className={'learn-more-market-slider-left-trackThumb'}>
          <div className={'learn-more-market-slider-left-trackThumb-pointer'} style={trackThumbPointerStyle}>
            <SliderLeftArrowIcon fill={iconFill} />
          </div>
          <div className={'learn-more-market-slider-left-trackThumb-pointer'} style={trackThumbPointerStyle}>
            <SliderLeftArrowIcon fill={iconFill} />
          </div>
        </div>
      </div>

      <div className={'learn-more-market-slider-left-range'} />
    </div>
  );
}