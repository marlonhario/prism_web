import * as React from 'react';
import { scaleLinear, extent, select, area, pointer } from 'd3';
import { useRef } from 'react';
import { XAxis } from './XAxis';
import { YAxis } from './YAxis';
import { max, min, maxBy, minBy, } from 'lodash';

const Canyon = ({ 
   leftSegmentData, 
   rightSegmentData, 
   leftSegmentTitle, 
   rightSegmentTitle, 
   xAxisLabel, 
   yAxisLabel, 
   dimensions,
   isRenderDropdown = false
}) => {
   const svgRef = useRef(null);
   const initialGap = 0;
   const margin = dimensions.margin;
   const width = dimensions.width;
   const height = dimensions.height;
   const innerWidth = width - margin.left - margin.right;
   const innerHeight = height - margin.top - margin.bottom;
   const rightGraphGap = innerWidth + initialGap;
   const rightSegmentYaxisMax = maxBy(rightSegmentData, 'yAxisValue');
   const rightSegmentYaxisMin = minBy(rightSegmentData, 'yAxisValue');
   const leftSegmentYaxisMax = maxBy(leftSegmentData, 'yAxisValue');
   const leftSegmentYaxisMin = minBy(leftSegmentData, 'yAxisValue');
   const yMax = max([rightSegmentYaxisMax.yAxisValue, leftSegmentYaxisMax.yAxisValue]);
   const yMin = min([rightSegmentYaxisMin.yAxisValue, leftSegmentYaxisMin.yAxisValue]);

   // Creating the SVG object
   const svgEl = select(svgRef.current);
   svgEl.selectAll("*").remove();
   
   svgEl.on("mouseout", hoverMouseOff).on("mousemove", hoverMouseOn);

   const xScale = scaleLinear()
      .range([0, innerWidth/2])
      .domain(extent(leftSegmentData, function(d) { return d.xAxisValue; }))
      .nice();

   const yScale = scaleLinear()
      .range([innerHeight/2, 0])
      .domain(extent(leftSegmentData, function(d) { return d.yAxisValue; }))
      .nice();

   const xScaleRight = scaleLinear()
      .domain( extent(rightSegmentData, function(d) { return d.xAxisValue; }))
      .range([rightGraphGap/2, 0])
      .nice();
   
   const yScaleRight = scaleLinear()
      .domain( extent(rightSegmentData, function(d) { return d.yAxisValue; }))
      .range([innerHeight/2, 0])
      .nice();


   const leftSegmentArea = area()
      .x(function(data) { return xScale(data.xAxisValue) })
      .y0(yScale(0))
      .y1(function(data) { return yScale(data.yAxisValue) });

   const rightSegmentArea = area()
      .x(function(data) { return xScaleRight(data.xAxisValue) })
      .y0(yScaleRight(0))
      .y1(function(data) { return yScaleRight(data.yAxisValue) });

   const hoverLineGroup = svgEl.select('.hover-content').append('g');
   const hoverTT = hoverLineGroup.append('text');
   const hoverTT2 = hoverLineGroup.append('text');
   const hoverTT3 = hoverLineGroup.append('text'); 
   const hoverTT4 = hoverLineGroup.append('text');          
   const hoverTT5 = hoverLineGroup.append('text');
   const hoverTT6 = hoverLineGroup.append('text');
   
         
   const hoverLine = hoverLineGroup.append("line").attr("x1", 10).attr("x2", 10).attr("y1", 0).attr("y2", innerHeight/2).attr("class", "hover-dashed-line");
   const hoverLine1 = hoverLineGroup.append("line").attr("x1", 0).attr("x2", width).attr("x2", 10).attr("y1", 10).attr("y2", 10).attr("class", "hover-dashed-line");
   const hoverLine2 = hoverLineGroup.append("line").attr("x1", 0).attr("x2", width).attr("y1", 10).attr("y2", 10).attr("class", "hover-dashed-line");

   var hoverCircle = hoverLineGroup.append("circle")
   hoverLineGroup.style("opacity", 1e-6);
   
   function hoverMouseOff() {
      hoverLineGroup.style("opacity", 1e-6);
   }

   function hoverMouseOn(event) {
      const mouse_x = pointer(event)[0];
      const mouse_y = pointer(event)[1];
      hoverLineGroup.style({ 'font-weight': 'bold','opacity': 1 });
      hoverLine.attr("x1", mouse_x).attr("x2", mouse_x).attr("y1", mouse_y)
      hoverLine1.attr("y1", mouse_y).attr("y2", mouse_y).attr("x1", 0).attr("x2", mouse_x - 120)
      hoverLine2.attr("y1", mouse_y).attr("y2", mouse_y).attr("x1", mouse_x + 120).attr("x2", innerWidth)
      hoverCircle.attr("class", "canyon-circle").attr("r", 8).attr('cx', mouse_x).attr('cy', mouse_y);
      hoverTT.text("Growth: " + 100).attr("class", "green-overlay").attr('x', mouse_x + 20).attr('y', mouse_y);
      hoverTT2.text("Income: " + 100).attr("class", "green-overlay").attr('x', mouse_x - 100).attr('y', mouse_y);
      hoverTT3.text("60%").attr("class", "hover-value").attr('x', mouse_x - 70).attr('y', mouse_y - 20); 
      hoverTT4.text("40%").attr("class", "hover-value").attr('x', mouse_x + 35).attr('y', mouse_y - 20); 
      hoverTT5.text("$6.00").attr("class", "hover-value").attr('x', mouse_x - 70).attr('y', mouse_y + 20); 
      hoverTT6.text("$4.00").attr("class", "hover-value").attr('x', mouse_x + 35).attr('y', mouse_y + 20); 
      hoverLineGroup.style("opacity", 1);
   }
   
   return (
      <svg ref={svgRef} width={innerWidth + margin.left + margin.right + 300} height={innerHeight + margin.top + margin.bottom} >
         <g transform={`translate(${margin.left},${margin.top})`} >
            <XAxis xScale={xScale} translateX={0}  translateY={innerHeight/2} />
            <YAxis yScale={yScale} translateX={0}  translateY={0} axis={"left"}/>
            <XAxis xScale={xScaleRight} translateX={rightGraphGap/2}  translateY={innerHeight/2} />
            <YAxis yScale={yScaleRight} translateX={rightGraphGap}  translateY={0} axis={"right"}/>
            <path d={leftSegmentArea(leftSegmentData)} className='area-left'/>
            <path d={rightSegmentArea(rightSegmentData)} transform={`translate(${rightGraphGap/2},0)`} className='area-right' />
            <text className='title' x={rightGraphGap/4 - 40} y={-20} > {leftSegmentTitle} </text>
            <text className='title' x={(rightGraphGap * 3)/4 + 40} y={-20} > {rightSegmentTitle} </text>
            <text transform={`translate(${(innerWidth / 4)},${(innerHeight/2 + margin.bottom + 10)})`} textAnchor='middle'>{xAxisLabel}</text>
            <text transform={'rotate(-90)'} x={0 - (innerHeight / 4)} y={-40} textAnchor='middle'> {yAxisLabel} </text>
            <text transform={`translate(${(innerWidth * 3 / 4)},${(innerHeight/2 + margin.bottom + 10)})`} textAnchor='middle'>{xAxisLabel}</text>
            <text transform={'rotate(-90)'} x={0 - (innerHeight / 4)} y={rightGraphGap + 50}  textAnchor='middle'> {yAxisLabel} </text>
         </g>
         <g className='hover-content'></g>
      </svg>
   );
}

export default Canyon;
