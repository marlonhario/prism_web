import * as React from 'react';
import { scaleLinear, extent, select, area, axisBottom, axisRight,axisLeft } from 'd3';
import * as d3 from 'd3';
import { useRef } from 'react';
import { max, maxBy, round } from 'lodash';
import { getIncomeYield, getGrowthYield, getSharePercent, getImpliedPrice, getImpliedPercentage, getImpliedGrowthRatio } from './utils';
import './Canyon.scss';

const Canyon = ( { 
   leftSegmentData, 
   rightSegmentData, 
   leftSegmentTitle, 
   rightSegmentTitle, 
   xAxisLabel, 
   yAxisLabel, 
   dimensions,
   leftSegmentColor,
   rightSegmentColor,
   securityMetaData,
   etaMetaData
}) => {
   const svgRef = useRef(null);
   const svgRefElRight = useRef(null);
   const forwardYield = securityMetaData.forwardDivYield;
   const underLyingLastAvailablePrice = securityMetaData.lastPrice;
   const growthEstablishmentPrice =  etaMetaData.growthEstablishmentPrice;
   const incomeEstablishmentPrice = etaMetaData.incomeEstablishmentPrice;
   const establishmentPrice = growthEstablishmentPrice + incomeEstablishmentPrice;

   const initialGap = 0;
   const margin = dimensions.margin;
   const width = dimensions.width;
   const height = dimensions.height;
   const innerWidth = width - margin.left - margin.right;
   const innerHeight = height - margin.top - margin.bottom;
   const rightGraphGap = innerWidth + initialGap;
   // Creating the SVG object
   const svgEl = select(svgRef.current);
   svgEl.selectAll("*").remove();

   const svgElRight = select(svgRefElRight.current);
   svgElRight.selectAll("*").remove();

   const svg = svgEl
      .attr("width", innerWidth/2 + margin.left + margin.right)
      .attr("height", innerHeight/2 + margin.top + margin.bottom)
      .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"); 

   const svgRight = svgElRight
      .attr("width", innerWidth/2 + margin.left + margin.right)
      .attr("height", innerHeight/2 + margin.top + margin.bottom)
      .append("g").attr("transform", "translate(" + 0 + "," + margin.top + ")"); 

   const rightSegmentYaxisMax = maxBy(rightSegmentData, 'yAxisValue');
   const leftSegmentYaxisMax = maxBy(leftSegmentData, 'yAxisValue');
   const yMax = max([rightSegmentYaxisMax.yAxisValue, leftSegmentYaxisMax.yAxisValue]);
   const xScale = scaleLinear().range([0, innerWidth/2]).domain(extent(leftSegmentData, function(d) { return d.xAxisValue; })).nice();
   const yScale = scaleLinear().range([innerHeight/2, 0]).domain([0, yMax]).nice();
   const xScaleRight = scaleLinear().domain(extent(rightSegmentData, function(d) { return d.xAxisValue; })).range([rightGraphGap/2, 0]).nice();
   const yScaleRight = scaleLinear().domain([0, yMax]).range([innerHeight/2, 0]).nice();

   // Creating the Left Chart axes
   svg.append("g").attr("transform", "translate(0," + innerHeight/2 + ")").call(axisBottom(xScale).ticks(0));
   svg.append("g").call(axisLeft(yScale));

   svg.append("text")
   .attr("transform", "translate(" + 15 + " ," + (innerHeight/2 + 20) + ")")
   .style("text-anchor", "middle")
   .text('Low');

   svg.append("text")
   .attr("transform", "translate(" + (innerWidth/2 - 20) + " ," + (innerHeight/2 + 20) + ")")
   .style("text-anchor", "middle")
   .text('High');

   // Creating the Right Chart axes
   svgRight.append("g").attr("transform", "translate(" + 0 + "," + innerHeight/2 + ")").call(axisBottom(xScaleRight).ticks(0));
   svgRight.append("g").attr("transform", "translate(" + ( rightGraphGap/2) + "," + 0 + ")").call(axisRight(yScaleRight));

   svgRight.append("text")
   .attr("transform", "translate(" + 15 + " ," + (innerHeight/2 + 20) + ")")
   .style("text-anchor", "middle")
   .text('High');

   svgRight.append("text")
   .attr("transform", "translate(" + (innerWidth/2) + " ," + (innerHeight/2 + 20) + ")")
   .style("text-anchor", "middle")
   .text('Low');

   // Plotting the Left Chart Area
   const leftSegmentArea = area()
      .x(function(data) { return xScale(data.xAxisValue) })
      .y0(yScale(0))
      .y1(function(data) { return yScale(data.yAxisValue) });

  // Plotting the Right Chart Area
   const rightSegmentArea = area()
      .x(function(data) { return xScaleRight(data.xAxisValue) })
      .y0(yScaleRight(0))
      .y1(function(data) { return yScaleRight(data.yAxisValue) });

   svg.append("path")
      .datum(leftSegmentData)
      .attr("class", "area-left")
      .attr("d", leftSegmentArea);

      svgRight.append("path")
      .datum(rightSegmentData)
      .attr("class", "area-right")
      .attr("d", rightSegmentArea).attr("transform", "translate(" + 0+ ",0)");
   // Plotting the axis Labels

   svg.append("text")
      .attr("transform", "translate(" + (innerWidth / 4) + " ," + (innerHeight/2 + 30) + ")")
      .style("text-anchor", "middle")
      .text(xAxisLabel);

   svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -50)
      .attr("x",0 - (innerHeight / 4))
      .style("text-anchor", "middle")
      .text(yAxisLabel);
   
   svgRight.append("text")
      .attr("transform", "translate(" + (innerWidth) / 4 + " ," + (innerHeight/2 + 30) + ")")
      .style("text-anchor", "middle")
      .text(xAxisLabel);


   svgRight.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", (rightGraphGap/2) + 40)
      .attr("x",0 - (innerHeight / 4))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text(yAxisLabel);

   svg.append("g").append('text')
      .attr('class', 'title')
      .attr('y', -20)
      .attr('x', rightGraphGap/4 - 40)
      .text(`${leftSegmentTitle}`)

   svgRight.append("g").append('text')
    .attr('class', 'title')
    .attr('y', -20)
    .attr('x', (rightGraphGap / 4) + 40)
    .text(rightSegmentTitle);

    // Need to reenable the Pills on the Hovering Label
    // svgRight.append('g').append('foreignObject')
    // .attr('width', '40')
    // .attr('height', '40')
    // .attr('y', -50)
    // .attr('x', rightGraphGap/4 + 10)
    // .append("xhtml:span").attr('class', "pill").attr('background-color', leftSegmentColor)
    // .html("ETA");

    //  svg.append('g').append('foreignObject')
    //    .attr('width', '40')
    //    .attr('height', '40')
    //    .attr('y', -50)
    //    .attr('x', (rightGraphGap * 3)/4 + 90)
    //    .append("xhtml:span").attr('class', "pill").attr('background-color', rightSegmentColor)
    //    .html("ETA");
  
   const hoverContainer = svg.append("g").attr("class", "canyon-hover-left").style("display", "none");
   hoverContainer.append("circle").attr("class", "canyon-circle").attr("r", 8);
   hoverContainer.append("text").attr("x", -80).attr("y", -50);
   svg.on("mouseover", function () {
    hoverContainer.style("display", null);
   })
   .on("mouseout", function () {
    hoverContainer.style("display", "none");
   })
   .on("mousemove", mousemove);


   var hoverContainerRight = svgRight.append("g").attr("class", "canyon-hover-right").style("display", "none");
   hoverContainerRight.append("circle").attr("class", "canyon-circle").attr("r", 8);
   hoverContainerRight.append("text").attr("x",0).attr("y",0);
   svgRight.on("mouseover", function () {
      hoverContainerRight.style("display", null);
    })
    .on("mouseout", function () {
      hoverContainerRight.style("display", "none");
    })
    .on("mousemove", mousemoveRight);

   var bisectDate = d3.bisector(function(data) { return data.xAxisValue }).left;

   function mousemove() {
    const activePosition = xScale.invert(d3.mouse(this)[0]);
     const index = bisectDate(leftSegmentData, activePosition, 1);
     const indexData = leftSegmentData[index - 1]
     const currentIndex = leftSegmentData[index];
     if (indexData && currentIndex) {
      const data = (activePosition - indexData.xAxisValue > currentIndex.xAxisValue - activePosition) ? currentIndex : indexData;
      hoverContainer.attr("transform", "translate(" + xScale(data.xAxisValue) + "," + yScale(data.yAxisValue) + ")");


      const impliedGrowthPrice = data.price;
      const incomeValue = getImpliedPrice(impliedGrowthPrice, underLyingLastAvailablePrice);
      const incomePrice = round(incomeValue,2);

      const incomeYield = getIncomeYield(incomeValue, forwardYield, underLyingLastAvailablePrice, establishmentPrice);
      const incomePercent = getSharePercent(incomeValue, underLyingLastAvailablePrice);

      const impliedGrowthRatio = getImpliedGrowthRatio(impliedGrowthPrice, underLyingLastAvailablePrice);
      const impliedGrowthPercentage = getImpliedPercentage(impliedGrowthPrice, underLyingLastAvailablePrice);
      hoverContainer.select("text").attr("x", -100).attr("y", -80).text(leftSegmentTitle).append("tspan").attr("x", 30).attr('y', -80).text(rightSegmentTitle)
      .append("tspan").attr("x", -100).attr("y", -50).text(`Multipler `).attr('class','normal').append('tspan').attr('class','bold').text(`${round(impliedGrowthRatio, 2)} x`)
      .append("tspan").attr("x", 30).attr('y', -50).text(`Yield `).attr('class','normal').append('tspan').attr('class','bold').text(`${round(incomeYield,2)}%`)
      .append("tspan").attr("x", -100).attr("y", -20).attr('class','bold').text(`$${round(impliedGrowthPrice, 2).toFixed(2)} `).append('tspan').attr('class','normal').text(`(${round(impliedGrowthPercentage,2)}%)`)
      .append("tspan").attr("x", 30).attr('y', -20).attr('class','bold').text(`$${round(incomePrice,2).toFixed(2)} `).append('tspan').attr('class','normal').text(`(${round(incomePercent,2)}%)`);
     }
   }

  function mousemoveRight() {
      const activePosition = xScaleRight.invert(d3.mouse(this)[0]);
      const index = bisectDate(rightSegmentData, activePosition, 1);
      const indexData = rightSegmentData[index - 1]
      const currentIndex = rightSegmentData[index];
      if (indexData && currentIndex) {
        const data = activePosition - indexData.xAxisValue > currentIndex.xAxisValue - activePosition ? currentIndex : indexData;
        hoverContainerRight.attr("transform", "translate(" + xScaleRight(data.xAxisValue) + "," + yScaleRight(data.yAxisValue) + ")");
        const incomeValue = data.price;
        const growthPrice = getImpliedPrice(incomeValue, underLyingLastAvailablePrice);
        const growthYield = getGrowthYield(growthPrice, underLyingLastAvailablePrice);
        const growthPercent = getSharePercent(growthPrice, underLyingLastAvailablePrice);
        const impliedIncomePrice = round(incomeValue,2);
        const impliedIncomeYield = getIncomeYield(impliedIncomePrice, forwardYield, underLyingLastAvailablePrice, establishmentPrice);
        const impliedIncomePercentage = getImpliedPercentage(impliedIncomePrice, underLyingLastAvailablePrice);
        hoverContainerRight.select("text").attr("x", -100).attr("y", -80).text(leftSegmentTitle).append("tspan").attr("x", 30).attr('y', -80).text(rightSegmentTitle)
        .append("tspan").attr("x", -100).attr("y", -50).text(`Multipler `).attr('class','normal').append('tspan').attr('class','bold').text(`${round(growthYield, 2)} x`)
        .append("tspan").attr("x", 30).attr('y', -50).text(`Yield `).attr('class','normal').append('tspan').attr('class','bold').text(`${round(impliedIncomeYield,2)}%`)
        .append("tspan").attr("x", -100).attr("y", -20).attr('class','bold').text(`$${round(growthPrice, 2).toFixed(2)} `).append('tspan').attr('class','normal').text(`(${round(growthPercent,2)}%)`)
        .append("tspan").attr("x", 30).attr('y', -20).attr('class','bold').text(`$${round(impliedIncomePrice,2).toFixed(2)} `).append('tspan').attr('class','normal').text(`(${round(impliedIncomePercentage,2)}%)`);
      }
  }
   

   svg.append("linearGradient")
      .attr("id", "area-left-chart")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", '0%').attr("y1", '0%')
      .attr("x2", '0%').attr("y2", '100%')
      .selectAll("stop")
      .data([
      { offset: "0%", color: leftSegmentColor, opacity:'0.9' },
      { offset: "30%", color: leftSegmentColor, opacity:'0.4' },
      { offset: "60%", color: leftSegmentColor, opacity:'0.3'},
      { offset: "90%", color: "transparent", opacity:'0.1'}])
      .enter().append("stop")
      .attr("offset", function (d) {return d.offset;})
      .attr("stop-color", function (d) {return d.color;})
      .attr("stop-opacity", function (d) {return d.opacity;});

   svg.append("linearGradient")
      .attr("id", "area-right-chart")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", '10%').attr("y1", '10%')
      .attr("x2", '10%').attr("y2", '100%')
      .selectAll("stop")
      .data([
      { offset: "0%", color: rightSegmentColor, opacity:'0.9' },
      { offset: "30%", color: rightSegmentColor, opacity:'0.4' },
      { offset: "60%", color: rightSegmentColor, opacity:'0.3'},
      { offset: "90%", color: "transparent", opacity:'0.1'}])
      .enter().append("stop")
      .attr("offset", function (d) {return d.offset;})
      .attr("stop-color", function (d) {return d.color;})
      .attr("stop-opacity", function (d) {return d.opacity;});
   return (
      <>
         <svg ref={svgRef} width={width / 4} height={height / 2} />
         <svg ref={svgRefElRight} width={width / 4} height={height / 2} />
      </>
   )
}

export default Canyon;