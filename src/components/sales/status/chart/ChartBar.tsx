import { convertNumberToWon } from '@/shared/helper';
import useSalesStore from '@/shared/store/sales';
import { BarElement, CategoryScale, ChartArea, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import styles from './styles/ChartBar.module.css';
// Chart.js를 사용하려면 먼저 library 등록을 해야합니다.
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

interface ChartProps {
  ctx: CanvasRenderingContext2D;
  chartArea: ChartArea;
}
/**
 *  chat.js의 plugin객체인데, chart component의 option의 plugin에 id 값을 입력하면 사용가능합니다
 *
 * chart component의 어디서든 재사용 가능하도록 하는것이 plugin 같습니다.
 */

const CHART_MAIN_COLOR = '#7433FF';

const ChartBar = () => {
  const { data } = useSalesStore();

  return (
    <div className={styles.barWrapper}>
      {data.length !== 0 && (
        <Bar
          // style={{
          //   width: '100%',
          // }}
          data={{
            datasets: [
              {
                data,
                backgroundColor: data.map((_, i) => {
                  const bgColor = i === data.length - 1 ? CHART_MAIN_COLOR : '#EDEDED';
                  return bgColor;
                }),
                barThickness: 90,
              },
            ],
          }}
          options={{
            // maintainAspectRatio: false,
            // responsive: true,
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
                color: value => {
                  return value.dataset.data.length - 1 === value.dataIndex ? 'red' : ' #000';
                }, // 바 위에 뜬 value에 대한 color 조절 입니다.
                anchor: 'end', // datalabel 위치 조정
                align: 'top', // datalabel text 위치 조정
                offset: 0, // datalabel 위치 조정
                clamp: true,

                font: {
                  weight: 800,
                  size: 14,
                  lineHeight: '1.4rem',
                },
                formatter(value) {
                  return convertNumberToWon(value.y);
                },
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default ChartBar;
