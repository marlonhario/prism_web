import { DividendForecast } from 'common/interfaces/ETAShowcase/DividendForecast';
import { each, isEmpty, orderBy } from 'lodash';
import { prismAnnualFee } from 'pages/Perspective/utils';
import { useEffect, useMemo, useState } from 'react';
import { Bar, BarChart, ReferenceLine, Tooltip } from 'recharts';
import apiFetch, { GetAnnualForecast } from 'services/apiFetch';
import { YieldChartProps } from './YieldChart.props';

const YieldChartView: React.FC<YieldChartProps> = (props: YieldChartProps) => {
  const [dividendForecast, setDividendForecast] = useState<DividendForecast[]>(
    []
  );

  const fetchDividendForecast = () => {
    if (!isEmpty(props.activeSecurity)) {
      apiFetch(GetAnnualForecast(props.activeSecurity.ticker)).then((res) => {
        const etaData = res.data;
        const etaList = orderBy(
          etaData,
          [(obj) => new Date(etaData.declareDate)],
          ['asc']
        );
        setDividendForecast(etaList);
      });
    }
  };

  const forecast:DividendForecast[] = useMemo(() => {
    const establishmentPrice =
        props.content.growthEstablishmentPrice +
        props.content.incomeEstablishmentPrice;
    const feeAmount = establishmentPrice * prismAnnualFee;

    const tempForecast = [...dividendForecast]

    each(tempForecast, (dividendContent, i) => {
      const divETA = parseFloat(
        (
            (100 * (dividendContent.perShareAmount - feeAmount)) /
            props.content.incomeETAPrice
        ).toFixed(2)
        );
        dividendContent.dividendETA = divETA >= 0 ? divETA : 0;
    });
    
    return tempForecast;
  }, [props.content, dividendForecast])



  useEffect(() => {
    fetchDividendForecast();
  }, [props.activeSecurity]);

  return (
    <BarChart
      id={`yield-graph-${props.profile.label}`}
      className="yield-graph"
      data={forecast}
      width={248}
      height={189}
      barSize={8}
      margin={{
        top: 5,
        bottom: 0,
      }}
    >
      <Tooltip
        content={({ active, payload, label }) => {
          if (active && payload && payload.length) {
            return (
              <div className="custom-tooltip div-bar-chart">
                <p className={`label text-[${props.color}]`}>
                  {payload ? payload[0].payload.dividendETA : ''}
                </p>
              </div>
            );
          }
        }}
      />
      <ReferenceLine
        ifOverflow="extendDomain"
        y={5}
        stroke="white"
        strokeDasharray="3 3"
        position="end"
        className="bar-reference-line"
        label="5%"
      />
      <Bar
        dataKey="dividendETA"
        fill={props.barFill}
        stroke={props.barStroke}
        radius={[10, 10, 0, 0]}
        name="Dividend ETA"
      />
    </BarChart>
  );
};

export default YieldChartView;
