import { PayoffChartProps } from './PayoffChart.props';
import { useEffect, useRef, useState } from 'react';
import { Point } from './PayoffChart.props';
import {
  includes,
  isEmpty,
  isNull,
  each,
  maxBy,
  minBy,
  max,
  isUndefined,
} from 'lodash';
import * as d3 from 'd3';
import { EtaColorCode } from './constants';
import cn from 'classnames';
import { useLocation } from 'react-router-dom';
import ROUTES from 'common/consts/routes';
import useIsDesktop from 'hooks/useIsDesktop';

const PayoffChartView: React.FC<PayoffChartProps> = ({
  hideDetails = false,
  ...props
}: PayoffChartProps) => {
  const isDesktop = useIsDesktop();
  const location = useLocation();
  const [totalInvestment, setTotalInvestment] = useState(0);

  const [eta1FullLossPrice, setEta1FullLossPrice] = useState(0);
  const [eta2FullLossPrice, setEta2FullLossPrice] = useState(0);
  const [eta1DownsideStarts, setEta1DownsideStarts] = useState(0);
  const [eta2DownsideStarts, setEta2DownsideStarts] = useState(0);
  const [eta1GrowthAllowed, setEta1GrowthAllowed] = useState(0);
  const [eta2GrowthAllowed, setEta2GrowthAllowed] = useState(0);
  const [eta1PercentOfInvestment, setEta1PercentOfInvestment] = useState(0);
  const [eta2PercentOfInvestment, setEta2PercentOfInvestment] = useState(0);
  const [cashReturned, setCashReturned] = useState(0);
  const payoffRef = useRef<SVGSVGElement>(null);


  /**
   * @description draws the payoff chart depending on the slider values
   * @param data the points plotted
   */
  const renderMultiChart = (data: Point[]) => {
    const svgPayOff = d3.select(payoffRef.current);
    svgPayOff.selectAll('*').remove();

    const width = 248;
    const height = props.chartHeight;
    const margin = 0;

    /** Below line might be usefull for future changes */
    // const yAxisMinLimit = 200;
    // const yAxisMaxLimit = 1000;
    each(data, (value) => {
      each(value, (dataValue, dataKey) => {
        if (dataKey === 'underlyingChange') {
          value.xAxisValue = dataValue * 100;
        }
        if (dataKey === 'eta1Percent') {
          value.eta1YAxisValue = dataValue * 100;
        }
        if (dataKey === 'eta2Percent') {
          value.eta2YAxisValue = dataValue * 100;
        }
        if (dataKey === 'combinedPercent') {
          value.combinedYAxisValue = dataValue * 100;
        }
      });
    });

    const xAxisValueMax = maxBy(data, 'xAxisValue');
    const xAxisValueMin = minBy(data, 'xAxisValue');

    const eta1YAxisValueMax = maxBy(data, 'eta1YAxisValue');
    const eta1YAxisValueMin = minBy(data, 'eta1YAxisValue');
    const eta2YAxisValueMax = maxBy(data, 'eta2YAxisValue');
    const combinedYAxisValueMax = maxBy(data, 'combinedYAxisValue');

    const YAxisMaxValue =
      max([
        eta1YAxisValueMax?.eta1YAxisValue,
        !isUndefined(props.profile2?.label)
          ? eta2YAxisValueMax?.eta2YAxisValue
          : 0,
        !isUndefined(props.profile2?.label)
          ? combinedYAxisValueMax?.combinedYAxisValue
          : 0,
      ]) || 0;

    const nextMaxYAxisValue =
      Math.ceil((YAxisMaxValue === 0 ? 1 : YAxisMaxValue) / 100) * 100;
    /* Scale */
    const xScale = d3
      .scaleLinear()
      .domain([
        xAxisValueMin ? xAxisValueMin.xAxisValue : 0,
        xAxisValueMax ? xAxisValueMax.xAxisValue : 0,
      ])
      .range([0, width - margin]);

    const yScale = d3
      .scaleLinear()
      // .domain([-100, (YAxisMaxValue < yAxisMinLimit) ? yAxisMinLimit : ((nextMaxYAxisValue > yAxisMaxLimit) ? yAxisMaxLimit : nextMaxYAxisValue)])
      .domain([-100, props.type === 'income' ? nextMaxYAxisValue : 500])
      .range([height - margin, 0]);

    //the circle in the  center of the payoffchart
    const circle = svgPayOff
      .append('svg')
      .attr('width', '18')
      .attr('height', 18)
      .attr('fill', 'none')
      .attr('x', xScale(data[100].xAxisValue - 6))
      .attr(
        'y',
        location.pathname === ROUTES.CUSTOM_SHARE && !isDesktop ?
        75 :
        yScale(
          props.type === 'income'
            ? data[100].eta1YAxisValue + 10
            : data[100].eta1YAxisValue + 16
        )
      );

    circle
      .append('path')
      .attr('fill-rule', 'evenodd')
      .attr(
        'd',
        'M9.00041 12.7108C9.73068 12.7108 10.4446 12.4942 11.0518 12.0885C11.6589 11.6828 12.1322 11.1061 12.4117 10.4314C12.6911 9.75677 12.7642 9.01437 12.6218 8.29813C12.4793 7.5819 12.1276 6.92399 11.6113 6.40761C11.0949 5.89124 10.437 5.53959 9.72074 5.39713C9.00451 5.25466 8.26211 5.32776 7.58743 5.60722C6.91275 5.88668 6.3361 6.35993 5.93038 6.96713C5.52467 7.57432 5.30811 8.2882 5.30811 9.01847C5.30811 9.99773 5.69713 10.9369 6.38957 11.6293C7.08201 12.3218 8.02115 12.7108 9.00041 12.7108Z'
      )
      .attr('fill', 'white');

    circle
      .append('path')
      .attr(
        'd',
        'M9.00048 15C10.1872 15 11.3472 14.6481 12.3339 13.9888C13.3206 13.3295 14.0896 12.3924 14.5438 11.2961C14.9979 10.1997 15.1167 8.99334 14.8852 7.82946C14.6537 6.66557 14.0822 5.59649 13.2431 4.75737C12.404 3.91826 11.3349 3.3468 10.171 3.11529C9.00715 2.88378 7.80074 3.00261 6.70438 3.45674C5.60803 3.91086 4.67097 4.6799 4.01168 5.66659C3.35239 6.65328 3.00049 7.81332 3.00049 9.00001C3.00049 10.5913 3.63263 12.1174 4.75785 13.2426C5.88306 14.3679 7.40918 15 9.00048 15Z'
      )
      .attr('stroke', `url(#circle${props.profile.label})`)
      .attr('stroke-opacity', '0.46')
      .attr('stroke-width', '5');

    const circleDefs = circle.append('defs');

    const circleGradient = circleDefs
      .append('linearGradient')
      .attr('id', `circle${props.profile.label}`)
      .attr('x1', '12.2036')
      .attr('x2', '6.48972')
      .attr('y1', '8.86154')
      .attr('y2', '9.10154')
      .attr('gradientUnits', 'userSpaceOnUse');

    circleGradient
      .append('stop')
      .attr('class', 'start')
      .attr('offset', '0')
      .attr('stop-color', '#C1C1C6')
      .attr('stop-opacity', '1');

    circleGradient
      .append('stop')
      .attr('class', 'end')
      .attr('offset', '1')
      .attr('stop-color', 'white')
      .attr('stop-opacity', '1');

    /* Add SVG */
    const defs = svgPayOff.append('defs');
    const svg = svgPayOff
      // .append("svg")
      // .attr("width", width + margin + "px")
      // .attr("height", height + margin + "px")
      // .html(`<defs>${etaPercentFill}</defs`)
      .append('g');

    // defs.html(etaPercentFill);
    let gradient;
    if (props.etaPercentFill.type === 'linear') {
      gradient = defs
        .append('linearGradient')
        .attr('id', `etaPercentFill${props.profile.label}`)
        .attr('x1', '0%')
        .attr('x2', '100%')
        .attr('y1', '0%')
        .attr('y2', '100%')
        .attr('gradientUnits', 'userSpaceOnUse');
    } else {
      gradient = defs
        .append('radialGradient')
        .attr('id', `etaPercentFill${props.profile.label}`)
        .attr('cx', '0%')
        .attr('cy', '100%')
        .attr('gradientUnits', 'userSpaceOnUse');
    }

    if (!isUndefined(gradient)) {
      gradient
        .append('stop')
        .attr('class', 'start')
        .attr('offset', props.etaPercentFill.offset1)
        .attr('stop-color', props.etaPercentFill.color1)
        .attr('stop-opacity', props.etaPercentFill.opacity1);

      gradient
        .append('stop')
        .attr('class', 'end')
        .attr('offset', props.etaPercentFill.offset2)
        .attr('stop-color', props.etaPercentFill.color2)
        .attr('stop-opacity', props.etaPercentFill.opacity2);
    }

    const focus = svg
      .append('g')
      .attr('class', 'focus')
      .style('display', 'none');

    focus
      .append('line')
      .attr('class', 'x-hover-line hover-line')
      .attr('y1', 0)
      .attr('y2', height);

    focus
      .append('line')
      .attr('class', 'y-hover-line hover-line')
      .attr('x1', width)
      .attr('x2', width);

    focus.append('circle').attr('r', 6.5);

    focus
      .append('text')
      .attr('x', 0)
      .attr('y', -20)
      .style('font-weight', 700)
      .attr('dy', '.31em');

    const legendData = [];
    if (
      props.profile.label !== '' &&
      props.etaPrice > 0 &&
      cashReturned === 0
    ) {
      /* Add line into SVG */
      let line;
      if (
        props.profile.label === 'DivGuard' ||
        props.profile.label === 'UltraGuard'
      ) {
        line = d3
          .line<Point>()
          .x((d, i) => xScale(d.xAxisValue))
          .y((d, i) =>
            i <= 100 && d.eta1Percent === 0
              ? yScale(0)
              : yScale(d.eta1YAxisValue)
          );
      } else {
        line = d3
          .line<Point>()
          .x((d) =>
            d.eta1YAxisValue === -100 ? xScale(-1) : xScale(d.xAxisValue)
          )
          .y((d) =>
            d.eta1YAxisValue === -100 ? yScale(-1) : yScale(d.eta1YAxisValue)
          );
      }

      // Add the area
      if (props.type === 'growth') {
        svg
          .append('path')
          .datum<Point[]>(data)
          .attr('fill', `url(#etaPercentFill${props.profile.label})`)
          .attr('stroke', 'none')
          .attr(
            'd',
            d3
              .area<Point>()
              .x0((d, i) => xScale(d.xAxisValue))
              .y0((d, i) =>
                yScale(d.eta1YAxisValue <= 500 ? d.eta1YAxisValue : 500)
              )
              .x1((d, i) => {
                if (
                  props.profile.label === 'MaxGrowth' ||
                  props.profile.label === 'UltraGrowth'
                )
                  return i > 100 ? xScale(d.xAxisValue) : xScale(0);
                return d.eta1Percent >= d.underlyingChange
                  ? xScale(d.xAxisValue)
                  : xScale(0);
              })
              .y1((d, i) => yScale(d.xAxisValue))
          );
      } else {
        if (
          props.profile.label === 'DivGuard' ||
          props.profile.label === 'UltraGuard'
        )
          svg
            .append('path')
            .datum(data)
            .attr('fill', `url(#etaPercentFill${props.profile.label})`)
            .attr('stroke', 'none')
            .attr(
              'd',
              d3
                .area<Point>()
                .x0((d, i) => (i <= 100 ? xScale(d.xAxisValue) : xScale(0)))
                .y0((d, i) => (i <= 100 ? yScale(d.eta1YAxisValue) : yScale(0)))
                .x1((d, i) =>
                  i <= 100 && d.eta1Percent >= d.underlyingChange
                    ? xScale(d.xAxisValue)
                    : xScale(0)
                )
                .y1((d, i) => (i <= 100 ? yScale(d.xAxisValue) : yScale(0)))
            );
        if (props.profile.label === 'MaxDiv')
          svg
            .append('path')
            .datum(data)
            .attr('fill', `url(#etaPercentFill${props.profile.label})`)
            .attr('stroke', 'none')
            .attr(
              'd',
              d3
                .area<Point>()
                .x0((d, i) => (i <= 100 ? xScale(d.xAxisValue) : xScale(0)))
                .y0((d, i) => (i <= 100 ? yScale(d.eta1YAxisValue) : yScale(0)))
                .x1((d, i) => xScale(0))
                .y1((d, i) => (i <= 100 ? yScale(d.xAxisValue) : yScale(0)))
            );
      }

      if (props.type === 'income') {
        svg
          .append('path')
          .datum(data)
          .attr('class', 'line')
          .attr('d', line)
          .style('fill', 'none')
          .style('stroke', props.stroke)
          .style('stroke-width', '2');
      }
    }

    if (
      !isUndefined(props.profile2?.type) &&
      !isEmpty(props.profile2?.type.toString())
    ) {
      if (
        cashReturned === 0 &&
        (props.etaPrice2 || 0) > 0 &&
        props.etaPrice > 0
      ) {
        var line2 = d3
          .line<Point>()
          .x((d) => xScale(d.xAxisValue))
          .y((d) => yScale(d.eta2YAxisValue));

        svg
          .append('path')
          .datum(data)
          .attr('fill', props.stroke)
          .attr('stroke', 'none')
          .attr(
            'd',
            d3
              .area<Point>()
              .x((d) => xScale(d.xAxisValue))
              .y0(height - margin)
              .y1((d) => yScale(d.eta2YAxisValue))
          );

        svg
          .append('path')
          .datum(data)
          .attr('class', 'line')
          .attr('d', line2)
          .style('fill', 'none')
          .style('stroke', props.stroke)
          .style('stroke-width', '2');
      }

      const line3 = d3
        .line<Point>()
        .x((d) => xScale(d.xAxisValue))
        .y((d) => yScale(d.combinedYAxisValue));

      svg
        .append('path')
        .datum(data)
        .attr('fill', `url(#etaPercentFill${props.profile.label})`)
        .attr('stroke', 'none')
        .attr(
          'd',
          d3
            .area<Point>()
            .x((d) => xScale(d.xAxisValue))
            .y0(height - margin)
            .y1((d) => yScale(d.combinedYAxisValue))
        );

      svg
        .append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('d', line3)
        .style('fill', 'none')
        .style(
          'stroke',
          cashReturned !== 0 ? props.stroke : EtaColorCode.CombinedPercent
        )
        .style('stroke-width', '2');
    }

    if (props.profile.label !== '') {
      legendData.push({
        name: 'Underlying Shares',
        color: EtaColorCode.UnderlyingShare,
      });
      /* Add underlying share line into SVG */
      const underlyingShareLine = d3
        .line<Point>()
        .x((d) => xScale(d.xAxisValue))
        .y((d) => yScale(d.xAxisValue));

      // Add the area
      const shadow = defs
        .append('filter')
        .attr('id', `shadow${props.profile.label}`)
        .attr('x', '-2')
        .attr('y', '-2')
        .attr('width', 270)
        .attr('height', props.chartHeight);
      shadow.append('feGaussianBlur').attr('stdDeviation', '10');

      svg
        .append('path')
        .datum(data)
        .attr('fill', 'transparent')
        .attr('stroke', 'white')
        .attr(
          'd',
          d3
            .area<Point>()
            .x((d) => xScale(d.xAxisValue))
            // .y0(height - margin)
            .y((d) => yScale(d.xAxisValue))
        );
      svg
        .append('path')
        .datum(data)
        .attr('fill', 'transparent')
        .attr('filter', `url(#shadow${props.profile.label})`)
        .attr('stroke', 'black')
        .attr('stroke-width', '4')
        .attr(
          'd',
          d3
            .area<Point>()
            .x((d) => xScale(d.xAxisValue))
            // .y0(height - margin)
            .y((d) => yScale(d.xAxisValue - 10))
        );
    }
  };

  const calculateEtaDownsideType = (etaType: string) => {
    let etaDownsideTypeValue = 'Shared';
    if (includes(['MaxDiv', 'MaxGrowth', 'UltraGrowth'], etaType)) {
      etaDownsideTypeValue = 'FirstLoss';
    } else if (includes(['GrowthGuard', 'DivGuard', 'UltraGuard'], etaType)) {
      etaDownsideTypeValue = 'Protected';
    }
    return etaDownsideTypeValue;
  };

  const calculateEtaGrowthAllowed = (etaType: string): number => {
    return includes(
      ['MaxGrowth', 'PureGrowth', 'GrowthGuard', 'UltraGrowth'],
      etaType
    )
      ? 1
      : 0;
  };

  const calculateEtaDownsideStarts = (
    etaDownsideType: string,
    etaEstablishmentPrice: number,
    underlyingEstabPrice: number
  ) =>
    etaDownsideType === 'Protected'
      ? etaEstablishmentPrice
      : underlyingEstabPrice;

  const calculateEtaFullLossPrice = (
    etaDownsideType: string,
    etaEstablishmentPrice: number,
    underlyingEstabPrice: number
  ) =>
    etaDownsideType === 'FirstLoss'
      ? underlyingEstabPrice - etaEstablishmentPrice
      : 0;

  const calculateEtaReturnForPoint = (
    point: Point,
    growthAllowed: number,
    establishmentPrice: number,
    downsideStarts: number,
    fullLossPrice: number,
    n: number
  ) => {
    let data = 0;
    const underlyingEstabPrice =
      props.content.growthETAPrice + props.content.incomeETAPrice;
    if (point.underlyingPrice > underlyingEstabPrice) {
      data =
        establishmentPrice +
        growthAllowed * (point.underlyingPrice - underlyingEstabPrice);
    } else if (point.underlyingPrice > downsideStarts) {
      data = establishmentPrice;
    } else if (point.underlyingPrice > fullLossPrice) {
      data =
        establishmentPrice *
        ((point.underlyingPrice - fullLossPrice) /
          (downsideStarts - fullLossPrice));
    }
    return parseFloat(data.toFixed(2));
  };


  /**
   * @description used to calculated the points to be used in drawing the chart
   * @returns the points calculated
   */
  const calculatePointsToPlot = () => {
    const points = [];
    for (let index = 0; index <= 200; index++) {
      const n = index;
      const point = {
        underlyingChange: 0,
        underlyingPrice: 0,
        eta1Return: 0,
        eta1Percent: 0,
        eta2Return: 0,
        eta2Percent: 0,
        combinedPercent: 0,
      } as Point;
      point.underlyingChange = (n - 100) / 100;
      point.underlyingPrice =
        (props.content.growthLastPrice + props.content.incomeLastPrice) *
        (1 + point.underlyingChange); // underlyingLastPrice * (1 + point.underlyingChange)
      /** eta1Return caculation */
      point.eta1Return = calculateEtaReturnForPoint(
        point,
        eta1GrowthAllowed,
        props.etaPrice,
        eta1DownsideStarts,
        eta1FullLossPrice,
        n
      );
      /** eta1Percent caculation */
      point.eta1Percent = parseFloat(
        (
          (eta1PercentOfInvestment * (point.eta1Return - props.lastPrice)) /
          props.lastPrice
        ).toFixed(2)
      );

      if (!isEmpty(props.profile2)) {
        /** eta2Return caculation */
        point.eta2Return = calculateEtaReturnForPoint(
          point,
          eta2GrowthAllowed,
          props.etaPrice2 || 0,
          eta2DownsideStarts,
          eta2FullLossPrice,
          n
        );

        /** eta2Percent caculation */
        point.eta2Percent = parseFloat(
          (
            (eta2PercentOfInvestment *
              (point.eta2Return - (props.lastPrice2 || 0))) /
            (props.lastPrice2 || 0)
          ).toFixed(2)
        );
      }

      point.combinedPercent = parseFloat(
        (
          point.eta1Percent +
          (!isNull(point.eta2Percent) ? point.eta2Percent : 0)
        ).toFixed(2)
      );

      points.push(point);
    }
    return points;
  };

  useEffect(() => {
    if (
      !isEmpty(props.profile.label) &&
      !isEmpty(props.content) &&
      !isNull(totalInvestment)
    ) {
      /* set Eta1 Percent Of Investment */
      const eta1PercentOfInvestmentCalc = props.etaPrice / totalInvestment;
      setEta1PercentOfInvestment(
        !isNaN(eta1PercentOfInvestmentCalc) ? eta1PercentOfInvestmentCalc : 0
      );

      /* set Eta2 Percentage calculation */
      const eta2PercentOfInvestmentCalc =
        (props.etaPrice2 || 0) / totalInvestment;
      setEta2PercentOfInvestment(
        !isNaN(eta2PercentOfInvestmentCalc) ? eta2PercentOfInvestmentCalc : 0
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    totalInvestment,
    props.content.growthETAPrice,
    props.content.incomeETAPrice,
  ]);

  useEffect(() => {
    if (
      !isEmpty(props.profile.label) &&
      !isEmpty(props.profile.label.toString())
    ) {
      setTotalInvestment(
        props.etaPrice +
          (!isEmpty(props.profile2) ? props.content.incomeETAPrice : 0) +
          (cashReturned !== 0 ? cashReturned : 0)
      );
      setEta1GrowthAllowed(calculateEtaGrowthAllowed(props.profile.label));
      const downsideType = calculateEtaDownsideType(props.profile.label);

      setEta1FullLossPrice(
        calculateEtaFullLossPrice(
          downsideType,
          props.etaPrice,
          props.content.growthETAPrice + props.content.incomeETAPrice
        )
      );

      // setEta2FullLossPrice(calculateEtaFullLossPrice(eta2DownsideType, eta2EstablishmentPrice, underlyingEstab2Price));

      setEta1DownsideStarts(
        calculateEtaDownsideStarts(
          downsideType,
          props.establishmentPrice,
          props.content.growthETAPrice + props.content.incomeETAPrice
        )
      );
    }
    // setEta2DownsideStarts(calculateEtaDownsideStarts(eta2DownsideType, eta2EstablishmentPrice, underlyingEstab2Price));
  }, [props.content, props.profile, cashReturned]);

  useEffect(() => {
    if (eta1PercentOfInvestment !== 0 || eta2PercentOfInvestment !== 0) {
      const plotingPointsData = calculatePointsToPlot();
      renderMultiChart(plotingPointsData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eta1PercentOfInvestment, eta2PercentOfInvestment, props.etaPrice]);

  return (
    <div className="flex flex-col growth-chart overflow-hidden">
      <svg width={250} height={props.chartHeight} ref={payoffRef} />
      <div
        className={cn(
          `flex p-4 font-din2014 absolute w-[248px] ${props.detailsPosition}`,
          hideDetails ? 'hidden' : ''
        )}
      >
        <div
          className={cn(
            'flex flex-col w-1/2 items-start',
            props.type === 'growth' ? 'pt-52' : ''
          )}
        >
          <span className="text-white text-xxs mb-1 leading-[13px]">
            {['MaxGrowth', 'PureGrowth', 'MaxDiv', 'UltraGrowth'].includes(
              props.profile.label
            ) ? (
              <>
                RISK
                <br />
                EXPOSURE
              </>
            ) : (
              <>RISK EXPOSURE</>
            )}
          </span>
          <span className={`leading-[.8] text-base ${props.color}`}>
            {props.riskExposure}
          </span>
        </div>

        {isEmpty(props.profile.multipler) && (
          <div className="flex flex-col w-1/2 items-end justify-end text-right">
            <span className="text-white text-xxs mb-1">
              GROWTH
              <br />
              EXPOSURE
            </span>
            <span className={`leading-[.8] text-base ${props.color}`}>
              0.00X
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayoffChartView;
