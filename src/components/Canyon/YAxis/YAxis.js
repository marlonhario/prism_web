import { useRef, useEffect } from 'react';
import { select, axisLeft, axisRight } from 'd3';

export const YAxis = ({ yScale, translateX, translateY, axis = "left" }) => {
  const ref = useRef();
  useEffect(() => {
    const yAxisG = select(ref.current);
    const yAxis = axis==='left' ? axisLeft(yScale) : axisRight(yScale);
    yAxisG.call(yAxis);
  }, []);
  return <g 
    ref={ref} 
    transform={`translate(${translateX},${translateY})`} 
    />;
};

