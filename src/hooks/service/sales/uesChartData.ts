import { convertNumberToWon } from '@/shared/helper';
import useChartState from '@/shared/store/sales/salesChart';
import { ChartData, ChartOptions } from 'chart.js';
const useChartData = () => {
  const CHART_MAIN_COLOR = '#7433FF';
  const chartData = useChartState(state => state.chartData);
  const data: ChartData<
    'bar',
    {
      x: string;
      y: number;
    }[]
  > = {
    datasets: [
      {
        data: chartData,
        backgroundColor: chartData.map((_, i) => {
          const bgColor = i === chartData.length - 1 ? CHART_MAIN_COLOR : '#EDEDED';
          return bgColor;
        }),
        barThickness: 90,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    elements: {
      bar: {
        borderRadius: 10,
      },
    },
    layout: {
      padding: 50,
    },
    scales: {
      x: {
        border: {
          width: 1,
          color: '#ccc',
          display: true, // chartBackgrounArea의 x축 border
        },
        grid: {
          display: false, // chartBackgroundArea의 세로선
        },
        ticks: {
          font: {
            size: 18, // x 축 font-size
            family: 'Pretendard', // <- 여기다 font-family
          },
        },
      },
      y: {
        display: false,
        beginAtZero: true,
      },
    },

    plugins: {
      tooltip: {
        enabled: false, // 차트 hover시 보이는 label 없애기
      },
      legend: {
        display: false,
      },
      datalabels: {
        color: ' #000',

        // 바 위에 뜬 value에 대한 color 조절 입니다.
        anchor: 'end', // datalabel 위치 조정
        align: 'top', // datalabel text 위치 조정
        offset: 0, // datalabel 위치 조정
        clamp: true,
        font: {
          weight: 600,
          size: 18,
          lineHeight: '1.4rem',
        },
        formatter(value) {
          return convertNumberToWon(value.y).slice(0, -1);
        },
      },
    },
  };

  return { data, options };
};

export default useChartData;
