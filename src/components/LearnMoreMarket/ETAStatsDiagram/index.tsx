import 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';
import { addDays } from 'date-fns';

import './index.scss';

const startDate = new Date('2019-12-31');

const generateData = (initial: number) => {
  const years = 4;
  return Array(366 * years)
    .fill('')
    .reduce((acc, _, i) => {
      const prevPrice = acc[i - 1]?.y || 0;
      const price = prevPrice + ((Math.random() - 0.5) * initial);
      const date = addDays(startDate, i);

      acc[i] = {
        x: date,
        y: price
      };

      return acc;
    }, []);
}

export function LearnMoreMarketETAStatsDiagram() {
  return (
    <div className={'learnmore-market-eta-stats-diagram'}>
      <div className={'learnmore-market-eta-stats-diagram-header'}>
        <div className={'learnmore-market-eta-stats-diagram-header-title'}>
          <span>PRICE CHART</span>
        </div>

        <div className={'learnmore-market-eta-stats-diagram-header-legends'}>
          <div className={'learnmore-market-eta-stats-diagram-header-legend'}>
            <span>UNDERLYING</span>
          </div>

          <div className={'learnmore-market-eta-stats-diagram-header-legend'}>
            <span>GROWTH</span>
          </div>

          <div className={'learnmore-market-eta-stats-diagram-header-legend'}>
            <span>DIVIDEND</span>
          </div>
        </div>
      </div>

      <div className={'learnmore-market-eta-stats-diagram-body'}>
        <Line
          data={{
            datasets: [
              {
                label: 'UNDERLYING',
                pointRadius: 0,
                tension: 0,
                backgroundColor: '#A49E99',
                borderColor: '#A49E99',
                borderWidth: 1,
                data: generateData(10)
              },
              {
                label: 'GROWTH',
                pointRadius: 0,
                tension: 0,
                backgroundColor: '#01C4EA',
                borderColor: '#01C4EA',
                borderWidth: 1,
                data: generateData(6)
              },
              {
                label: 'DIVIDEND',
                pointRadius: 0,
                tension: 0,
                backgroundColor: '#265C89',
                borderColor: '#265C89',
                borderWidth: 1,
                data: generateData(2)
              }
            ]
          }}
          options={{
            plugins: {
              title: {
                display: false,
              },
              legend: {
                display: false,
              },
            },
            layout: {
              padding: {
                top: 18,
                right: 30,
                bottom: 4,
                left: 30,
              },
            },
            scales: {
              xAxes: {
                type: 'timeseries',
                bounds: 'data',
                grid: {
                  display: false,
                  drawBorder: false,
                },
                ticks: {
                  display: true,
                },
                time: {
                  unit: 'year',
                  stepSize: 1,
                },
              },
              yAxes: {
                grid: {
                  borderDash: [2, 2],
                  drawBorder: false,
                },
                ticks: {
                  display: false,
                  maxTicksLimit: 7,
                },
              }
            }
          }}
        />
      </div>
    </div>
  );
}