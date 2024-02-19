import { useRef, useEffect } from 'react';
import { select, axisBottom } from 'd3';

export const XAxis = ({ xScale, translateX, translateY }) => {
  const ref = useRef();
  useEffect(() => {
    const xAxisG = select(ref.current);
    const xAxis = axisBottom(xScale);
    xAxisG.call(xAxis);
  }, []);
  return <g transform={`translate(${translateX},${translateY})`} ref={ref} />;
};
