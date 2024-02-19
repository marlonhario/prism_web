import React, { useEffect, useRef, useState } from "react";
import { isEmpty, includes, each, maxBy, minBy, max, isNull, isUndefined } from "lodash";
import { EtaColorCode } from "./constants";
import "./styles.scss";
import * as d3 from "d3";

const PayoffChart = ({
  dimensions,
  useElementDimensions = false,
  underlyingSecurityPrice = 0,
  eta1EstablishmentPrice,
  eta2EstablishmentPrice = 0,
  eta1LastPrice,
  eta2LastPrice = 0,
  eta1Type,
  eta2Type = '',
  eta1Value,
  eta2Value = '',
  underlyingEstab1Price,
  underlyingEstab2Price = '',
  showLegend = true,
  showAxisLabel = true,
  fillColor = false,
  showDottedLine = false,
  mouseOver = true,
  cashReturned = ''
}) => {

  const [totalInvestment, setTotalInvestment] = useState(null);
  const [eta1PercentOfInvestment, setEta1PercentOfInvestment] = useState('');
  const [eta1DownsideType, setEta1DownsideType] = useState("");
  const [eta2DownsideType, setEta2DownsideType] = useState("");
  const [eta1FullLossPrice, setEta1FullLossPrice] = useState(0);
  const [eta2FullLossPrice, setEta2FullLossPrice] = useState(0);
  const [eta1DownsideStarts, setEta1DownsideStarts] = useState(0);
  const [eta2DownsideStarts, setEta2DownsideStarts] = useState(0);
  const [eta1GrowthAllowed, setEta1GrowthAllowed] = useState(0);
  const [eta2GrowthAllowed, setEta2GrowthAllowed] = useState(0);
  const [eta2PercentOfInvestment, setEta2PercentOfInvestment] = useState(0);

  /* ref variable to plot chart */
  const payoffRef = useRef(null);


  /* Render chart */
  const renderMultiChart = (payoffRef, data) => {

    const svgPayOff = d3.select(payoffRef.current);
    svgPayOff.selectAll("*").remove();

    let width = dimensions.width;
    let height = dimensions.height;
    let margin = dimensions.margin || 50;

    var svgNode = svgPayOff.node();
    var svgBound = svgNode.getBoundingClientRect();

    if (useElementDimensions) {
      width = svgBound.width;
      height = svgBound.height;
    }

    const lineOpacity = "0.8";
    const lineOpacityHover = "0.85";
    const otherLinesOpacityHover = "0.3";
    const lineStroke = "2px";
    const lineStrokeHover = "3px";

    const circleOpacity = "0.85";
    const circleOpacityOnLineHover = "0.25";

    /** Below line might be usefull for future changes */
    // const yAxisMinLimit = 200;
    // const yAxisMaxLimit = 1000;

    each(data, (value) => {
      each(value, (dataValue, dataKey) => {
        if (dataKey === 'underlyingChange') {
          value.xAxisValue = dataValue * 100;
        }
        if (dataKey === 'eta1Percent') {
          value.eta1YAxisValue = parseInt(dataValue * 100);
        }
        if (dataKey === 'eta2Percent') {
          value.eta2YAxisValue = parseInt(dataValue * 100);
        }
        if (dataKey === 'combinedPercent') {
          value.combinedYAxisValue = parseInt(dataValue * 100);
        }
      });
    });

    const xAxisValueMax = maxBy(data, 'xAxisValue');
    const xAxisValueMin = minBy(data, 'xAxisValue');

    const eta1YAxisValueMax = maxBy(data, 'eta1YAxisValue');
    const eta2YAxisValueMax = maxBy(data, 'eta2YAxisValue');
    const combinedYAxisValueMax = maxBy(data, 'combinedYAxisValue');

    const YAxisMaxValue = max([eta1YAxisValueMax.eta1YAxisValue, (!isUndefined(eta2Type)) ? eta2YAxisValueMax.eta2YAxisValue : 0, (!isUndefined(eta2Type)) ? combinedYAxisValueMax.combinedYAxisValue : 0]);

    const nextMaxYAxisValue = Math.ceil(((YAxisMaxValue === 0) ? 1 : YAxisMaxValue) / 100) * 100;

    /* Scale */
    const xScale = d3
      .scaleLinear()
      .domain([xAxisValueMin.xAxisValue, xAxisValueMax.xAxisValue])
      .range([0, width - margin]);

    const yScale = d3
      .scaleLinear()
      // .domain([-100, (YAxisMaxValue < yAxisMinLimit) ? yAxisMinLimit : ((nextMaxYAxisValue > yAxisMaxLimit) ? yAxisMaxLimit : nextMaxYAxisValue)])
      .domain([-100, nextMaxYAxisValue])
      .range([height - margin, 0]);



    /* Add SVG */
    const svg = svgPayOff
      .append("svg")
      .attr("width", width + margin + "px")
      .attr("height", height + margin + "px")
      .append("g")
      .attr("transform", `translate(5, ${margin})`);

    /** Add focus to svg */
    var focus = svg.append("g")
      .attr("class", "focus")
      .style("display", "none");

    focus.append("line")
      .attr("class", "x-hover-line hover-line")
      .attr("y1", 0)
      .attr("y2", height);

    focus.append("line")
      .attr("class", "y-hover-line hover-line")
      .attr("x1", width)
      .attr("x2", width);

    focus.append("circle")
      .attr("r", 6.5);

    focus.append("text")
      .attr("x", 0)
      .attr('y', -20)
      .style('font-weight', 700)
      .attr("dy", ".31em");


    const legendData = [];
    if (eta1Type !== '' && eta1Value > 0 && cashReturned === '') {
      legendData.push({ name: '', color: '' });
      legendData.push({ name: 'Eta1 Percent', color: EtaColorCode[eta1Type] });
      /* Add line into SVG */
      var line = d3.line()
        .x((d) => { return xScale(d.xAxisValue); })
        .y((d) => { return yScale(d.eta1YAxisValue); });

      if (fillColor) {
        // Add the area
        svg.append("path")
          .datum(data)
          .attr("fill", EtaColorCode[eta1Type])
          .attr("stroke", "none")
          .attr("d", d3.area()
            .x(function (d) { return xScale(d.xAxisValue) })
            .y0(height - margin)
            .y1(function (d) { return yScale(d.eta1YAxisValue) })
          );
      }


      svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line)
        .style("fill", "none")
        .style("stroke", EtaColorCode[eta1Type])
        .style("stroke-width", "2")
        .on("mouseover", function () {
          if (mouseOver) {
            focus.style("display", 'block');
            focus.attr("fill", EtaColorCode[eta1Type]);
            d3.selectAll(".line").style("opacity", otherLinesOpacityHover);
            d3.selectAll(".circle").style("opacity", circleOpacityOnLineHover);
            d3.select(this)
              .style("opacity", lineOpacityHover)
              .style("stroke-width", lineStrokeHover)
              .style("cursor", "pointer");
          }
        })
        .on("mouseout", function (d) {
          if(mouseOver) {
            focus.style("display", "none");
            d3.selectAll(".line").style("opacity", lineOpacity);
            d3.selectAll(".circle").style("opacity", circleOpacity);
            d3.select(this).style("stroke-width", lineStroke).style("cursor", "none");
          }
        })
        .on("mousemove", (mouseOver) ? mousemove : () => {});

      function mousemove() {
        var x0 = xScale.invert(d3.mouse(this)[0]),
          i = bisectDate(data, x0, 1),
          d0 = data[i - 1],
          d1 = data[i],
          d = x0 - d0.xAxisValue > d1.xAxisValue - x0 ? d1 : d0;
        focus.attr("transform", "translate(" + xScale(d.xAxisValue) + "," + yScale(d.eta1YAxisValue) + ")");
        focus.select("text").text(function () { return `${d.eta1YAxisValue}%`; });
        focus.style("cursor", "pointer")
        focus.select(".x-hover-line").attr("y2", height - yScale(d.eta1YAxisValue) + 5);
        focus.select(".y-hover-line").attr("x2", width + width - 10);
      }

    }
    
    if (!isUndefined(eta2Type) && !isEmpty(eta2Type.toString())) {

      if(cashReturned === '' && (eta2Value > 0 && eta1Value > 0)) {
        legendData.push({ name: 'Eta2 Percent', color: EtaColorCode[eta2Type] });
        var line2 = d3.line()
          .x((d) => { return xScale(d.xAxisValue); })
          .y((d) => { return yScale(d.eta2YAxisValue); });
        
        if (fillColor) {
          // Add the area
          svg.append("path")
            .datum(data)
            .attr("fill", EtaColorCode[eta2Type])
            .attr("stroke", "none")
            .attr("d", d3.area()
              .x(function (d) { return xScale(d.xAxisValue) })
              .y0(height - margin)
              .y1(function (d) { return yScale(d.eta2YAxisValue) })
            );
        }
  
        svg.append("path")
          .datum(data)
          .attr("class", "line")
          .attr("d", line2)
          .style("fill", "none")
          .style("stroke", EtaColorCode[eta2Type])
          .style("stroke-width", "2")
          .on("mouseover", function () {
            if (mouseOver) {
              focus.style("display", 'block');
              focus.attr("fill", EtaColorCode[eta2Type]);
              d3.selectAll(".line").style("opacity", otherLinesOpacityHover);
              d3.selectAll(".circle").style("opacity", circleOpacityOnLineHover);
              d3.select(this)
                .style("opacity", lineOpacityHover)
                .style("stroke-width", lineStrokeHover)
                .style("cursor", "pointer");
            }
          })
          .on("mouseout", function (d) {
            if (mouseOver) {
              focus.style("display", "none");
              d3.selectAll(".line").style("opacity", lineOpacity);
              d3.selectAll(".circle").style("opacity", circleOpacity);
              d3.select(this).style("stroke-width", lineStroke).style("cursor", "none");
            }
          })
          .on("mousemove", (mouseOver) ? mousemove2 : () => {});
  
        function mousemove2() {
          var x0 = xScale.invert(d3.mouse(this)[0]),
            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.xAxisValue > d1.xAxisValue - x0 ? d1 : d0;
          focus.attr("transform", "translate(" + xScale(d.xAxisValue) + "," + yScale(d.eta2YAxisValue) + ")");
          focus.select("text").text(function () { return `${d.eta2YAxisValue}%`; });
          focus.style("cursor", "pointer")
          focus.select(".x-hover-line").attr("y2", height - yScale(d.eta2YAxisValue) + 5);
          focus.select(".y-hover-line").attr("x2", width + width - 10);
        }
      }

      legendData.push({ name: 'Combined Percent', color: 'black' });
      var line3 = d3.line()
        .x((d) => { return xScale(d.xAxisValue); })
        .y((d) => { return yScale(d.combinedYAxisValue); })
      
      if (fillColor) {
        // Add the area
        svg.append("path")
          .datum(data)
          .attr("fill", EtaColorCode.combinedYAxisValue)
          .attr("stroke", "none")
          .attr("d", d3.area()
            .x(function (d) { return xScale(d.xAxisValue) })
            .y0(height - margin)
            .y1(function (d) { return yScale(d.combinedYAxisValue) })
          );
      }

      svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line3)
        .style("fill", "none")
        .style("stroke", (cashReturned !== '') ? EtaColorCode[eta1Type] : EtaColorCode.CombinedPercent)
        .style("stroke-width", "2")
        .on("mouseover", function () {
          if (mouseOver) {
            focus.style("display", 'block');
            focus.attr("fill", (cashReturned !== '') ? EtaColorCode[eta1Type] : EtaColorCode.CombinedPercent);
            d3.selectAll(".line").style("opacity", otherLinesOpacityHover);
            d3.selectAll(".circle").style("opacity", circleOpacityOnLineHover);
            d3.select(this)
              .style("opacity", lineOpacityHover)
              .style("stroke-width", lineStrokeHover)
              .style("cursor", "pointer");
          }
        })
        .on("mouseout", function (d) {
          if (mouseOver) {
            focus.style("display", "none");
            d3.selectAll(".line").style("opacity", lineOpacity);
            d3.selectAll(".circle").style("opacity", circleOpacity);
            d3.select(this).style("stroke-width", lineStroke).style("cursor", "none");
          }
        })
        .on("mousemove", (mouseOver) ? mousemove3 : () => {});

      function mousemove3() {
        var x0 = xScale.invert(d3.mouse(this)[0]),
          i = bisectDate(data, x0, 1),
          d0 = data[i - 1],
          d1 = data[i],
          d = x0 - d0.xAxisValue > d1.xAxisValue - x0 ? d1 : d0;

        focus.attr("transform", "translate(" + xScale(d.xAxisValue) + "," + yScale(d.combinedYAxisValue) + ")");
        focus.select("text").text(function () { return `${d.combinedYAxisValue}%`; });
        focus.style("cursor", "pointer")
        focus.select(".x-hover-line").attr("y2", height - yScale(d.combinedYAxisValue) + 5);
        focus.select(".y-hover-line").attr("x2", width + width - 10);
      }
    }

    if (eta1Type !== '') {
      legendData.push({ name: 'Underlying Shares', color: EtaColorCode.UnderlyingShare });
      /* Add underlying share line into SVG */
      var underlyingShareLine = d3.line()
        .x((d) => { return xScale(d.xAxisValue); })
        .y((d) => { return yScale(d.xAxisValue); });
      
      if (fillColor) {
        // Add the area
        svg.append("path")
          .datum(data)
          .attr("fill", EtaColorCode.UnderlyingShare)
          .attr("stroke", "none")
          .attr("d", d3.area()
            .x(function (d) { return xScale(d.xAxisValue) })
            .y0(height - margin)
            .y1(function (d) { return yScale(d.xAxisValue) })
          );
      }

      svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", underlyingShareLine)
        .style("fill", "none")
        .style("stroke", EtaColorCode.UnderlyingShare)
        .style("stroke-width", "2")
        .on("mouseover", function () {
          if (mouseOver) {
            d3.selectAll(".line").style("opacity", otherLinesOpacityHover);
            d3.select(this)
              .style("opacity", lineOpacityHover)
              .style("stroke-width", lineStrokeHover)
              .style("cursor", "pointer");
          }
        })
        .on("mouseout", function (d) {
          if (mouseOver) {
            d3.selectAll(".line").style("opacity", lineOpacity);
            d3.select(this).style("stroke-width", lineStroke).style("cursor", "none");
          }
        });
    }

    if (showDottedLine && eta1Type === 'MaxGrowth') {
      if (eta1Type !== '' && eta1Value > 0) {
        /* Add line into SVG */
        var dottedline = d3.line()
          .x((d) => { return xScale(d.xAxisValue); })
          .y((d) => { return yScale(d.eta1YAxisValue); });
  
        svg.append("path")
          .datum(data)
          .attr("class", "line")
          .attr("d", dottedline)
          .style("fill", "none")
          .style("stroke", EtaColorCode[eta1Type])
          .style("stroke-width", "2")
          .style("stroke-dasharray", ("3, 3"));
      }
    }

    /** Add legend to svg */
    if (showLegend) {
      var legend = svg.selectAll('g')
        .data(legendData)
        .enter()
        .append('g')
        .attr('class', 'legend');
  
      legend.append('rect')
        .attr('x', function (d, i) { return (i * 170) - 120; })
        .attr('y', height - 10)
        .attr('width', 35)
        .attr('height', 10)
        .style('fill', function (d) {
          return d.color;
        });
  
      legend.append('text')
        .attr('x', function (d, i) { return (i * 170) - 80; })
        .attr('y', height)
        .text(function (d) { return d.name; });
    }


    /* Add Axis into SVG */
    const xAxis = d3.axisBottom(xScale)
      .tickFormat((showAxisLabel) ? (d) => d + "%" : "")
      .ticks(20)
      .tickPadding(10)
      .tickSizeInner(0)
      .tickSizeOuter(0);
    
    const yAxis = d3
      .axisLeft(yScale)
      .tickFormat((showAxisLabel) ? (d) => d + "%" : "")
      .tickSizeInner(margin - width) // Ticks in between the outer ticks
      .tickSizeOuter(0) // Ticks on both outer sides
      .tickPadding(10); // Spacing between ticks and labels;

    svg
      .append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${yScale(0)})`)
      .call(xAxis);

    svg
      .append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .selectAll(".tick line")
      .style("stroke","#000000")
      .attr("opacity", 0.1)
      .append("text")
      .attr("y", 15)
      .attr("transform", "rotate(-90)")
      .attr("fill", "#000")
      .text("Total values");

    const bisectDate = d3.bisector(function (data) { return data.xAxisValue }).right;
  };

  const calculateEta1ReturnForPoint = (point) => {
    let data = 0;
    if (point.underlyingPrice > underlyingEstab1Price) {
      data = eta1EstablishmentPrice + (eta1GrowthAllowed * (point.underlyingPrice - underlyingEstab1Price))
    }
    else if (point.underlyingPrice > eta1DownsideStarts) {
      data = eta1EstablishmentPrice
    }
    else if (point.underlyingPrice > eta1FullLossPrice) {
      data = eta1EstablishmentPrice * ((point.underlyingPrice - eta1FullLossPrice) / (eta1DownsideStarts - eta1FullLossPrice))
    }
    return data.toFixed(2);
  }

  const calculateEta2ReturnForPoint = (point) => {
    let data = 0;

    if (point.underlyingPrice > underlyingEstab2Price) {
      data = eta2EstablishmentPrice + (eta2GrowthAllowed *
        (point.underlyingPrice - underlyingEstab2Price))
    }
    else if (point.underlyingPrice > eta2DownsideStarts) {
      data = eta2EstablishmentPrice
    }
    else if (point.underlyingPrice > eta2FullLossPrice) {
      data = eta2EstablishmentPrice * (
        (point.underlyingPrice - eta2FullLossPrice) /
        (eta2DownsideStarts - eta2FullLossPrice))
    }
    return data.toFixed(2);
  }

  const calculatePointsToPlot = () => {
    const points = [];
    for (let index = 0; index <= 200; index++) {
      const n = index;
      const point = {
        underlyingChange: null,
        underlyingPrice: null,
        eta1Return: null,
        eta1Percent: null,
        eta2Return: null,
        eta2Percent: null,
        combinedPercent: null
      };
      point.underlyingChange = (n - 100) / 100;
      point.underlyingPrice = underlyingSecurityPrice * (1 + point.underlyingChange); // underlyingLastPrice * (1 + point.underlyingChange)

      /** eta1Return caculation */
      point.eta1Return = calculateEta1ReturnForPoint(point);

      /** eta1Percent caculation */
      point.eta1Percent = (eta1PercentOfInvestment * (point.eta1Return - eta1LastPrice) / eta1LastPrice).toFixed(2);

      if (eta2Type !== '') {
        /** eta2Return caculation */
        point.eta2Return = calculateEta2ReturnForPoint(point);

        /** eta2Percent caculation */
        point.eta2Percent = (eta2PercentOfInvestment * (point.eta2Return - eta2LastPrice) / eta2LastPrice).toFixed(2);
      }

      point.combinedPercent = (parseFloat(point.eta1Percent) + parseFloat(!isNull(point.eta2Percent) ? point.eta2Percent : 0)).toFixed(2);

      points.push(point)
    }
    return points;
  }

  const calculateEtaDownsideType = (etaType) => {
    let etaDownsideTypeValue = "Shared";
    if (includes(["MaxDiv", "MaxGrowth"], etaType)) {
      etaDownsideTypeValue = "FirstLoss";
    } else if (includes(["GrowthGuard", "DivGuard"], etaType)) {
      etaDownsideTypeValue = "Protected";
    }
    return etaDownsideTypeValue;
  };

  const calculateEtaGrowthAllowed = (etaType) => includes(["MaxGrowth", "PureGrowth", "GrowthGuard"], etaType) ? 1 : 0;

  const calculateEtaFullLossPrice = (etaDownsideType, etaEstablishmentPrice, underlyingEstabPrice) => etaDownsideType === "FirstLoss" ? underlyingEstabPrice - etaEstablishmentPrice : 0;

  const calculateEtaDownsideStarts = (etaDownsideType, etaEstablishmentPrice, underlyingEstabPrice) => etaDownsideType === "Protected" ? etaEstablishmentPrice : underlyingEstabPrice;


  useEffect(() => {
    if (!isEmpty(eta1Type) && !isEmpty(eta1Value.toString())) {
      setTotalInvestment(Number(eta1Value + ((!isUndefined(eta2Value)) ? eta2Value : 0) + (cashReturned !== '' ? cashReturned : 0)));

      /* set Eta1 Downside Type calculations */
      setEta1DownsideType(calculateEtaDownsideType(eta1Type));

      /* set Eta2 Downside Type calculation */
      setEta2DownsideType(calculateEtaDownsideType(eta2Type));

      /* set Eta1 Growth Allowed calculations */
      setEta1GrowthAllowed(calculateEtaGrowthAllowed(eta1Type));

      /* set Eta2 Growth Allowed calculations */
      setEta2GrowthAllowed(calculateEtaGrowthAllowed(eta2Type));


    }
  }, [eta1Value, eta2Value, eta1Type, eta2Type, cashReturned]);

  useEffect(() => {
    if (!isEmpty(eta1Type) && !isEmpty(eta1Value.toString()) && !isNull(totalInvestment)) {
      /* set Eta1 Percent Of Investment */
      const eta1PercentOfInvestmentCalc = (eta1Value / totalInvestment);
      if((!isNaN(eta1PercentOfInvestmentCalc) ? eta1PercentOfInvestmentCalc : 0) === eta1PercentOfInvestment) {
        setEta1PercentOfInvestment((!isNaN(eta1PercentOfInvestmentCalc) ? eta1PercentOfInvestmentCalc : 0).toFixed(0));
      } else {
        setEta1PercentOfInvestment((!isNaN(eta1PercentOfInvestmentCalc) ? eta1PercentOfInvestmentCalc : 0));
      }

      /* set Eta2 Percentage calculation */
      const eta2PercentOfInvestmentCalc = eta2Value / totalInvestment;
      setEta2PercentOfInvestment(!isNaN(eta2PercentOfInvestmentCalc) ? eta2PercentOfInvestmentCalc : 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalInvestment, eta1Value, eta2Value]);

  useEffect(() => {
    if (eta1PercentOfInvestment !== '' || eta2PercentOfInvestment !== '') {
      const plotingPointsData = calculatePointsToPlot();
      renderMultiChart(payoffRef, plotingPointsData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eta1PercentOfInvestment, eta2PercentOfInvestment, eta1Value, dimensions])

  useEffect(() => {
    setEta1FullLossPrice(calculateEtaFullLossPrice(eta1DownsideType, eta1EstablishmentPrice, underlyingEstab1Price));
    setEta2FullLossPrice(calculateEtaFullLossPrice(eta2DownsideType, eta2EstablishmentPrice, underlyingEstab2Price));

    setEta1DownsideStarts(calculateEtaDownsideStarts(eta1DownsideType, eta1EstablishmentPrice, underlyingEstab1Price));
    setEta2DownsideStarts(calculateEtaDownsideStarts(eta2DownsideType, eta2EstablishmentPrice, underlyingEstab2Price));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eta1DownsideType, eta1EstablishmentPrice, eta2DownsideType, eta2EstablishmentPrice, underlyingEstab1Price, underlyingEstab2Price]);

  return (
    <div className="flex justify-center">
      <svg width={dimensions.width} height={dimensions.height} ref={payoffRef} />
    </div>
  );
};

export default PayoffChart;
