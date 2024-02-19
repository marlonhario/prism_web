import classNames from 'classnames';
import { useEffect, useRef } from 'react';

import { SliderProps } from '../types';
import styles from './index.module.scss';

export function Slider({
  value,
  minValue = 0,
  maxValue = 100,
  step,
  threshold,
  className,
  style,
  rangeStyle,
  trackStyle,
  trackThumbStyle,
  onChange,
  onMouseDown,
  onMouseUp
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
    <div
      className={classNames(styles.slider, className)}
      style={style}
    >
      <input
        type={'range'}
        value={value}
        min={minValue}
        max={maxValue}
        step={step}
        className={styles.input}
        onChange={({ target: { value } }) => handleChange(Number(value))}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      />

      <div
        ref={trackRef}
        className={styles.track}
        style={trackStyle}
      >
        <span
          className={styles.trackThumb}
          style={trackThumbStyle}
        />
      </div>

      <div
        className={styles.range}
        style={rangeStyle}
      />
    </div>
  );
}