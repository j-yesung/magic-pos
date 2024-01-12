import { convertNumberToWon } from '@/shared/helper';
import useManagementState from '@/shared/store/management';
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

const CHART_MAIN_COLOR = 'hsl(259, 100%, 50%)';

const chartXAxisBorder = {
  id: 'chartXAxisBorder',
  beforeDatasetsDraw({ ctx, chartArea }: ChartProps) {
    ctx.save(); //이해가 안됨 일딴 넘어가자
    ctx.beginPath(); // 선그리기 시작
    ctx.strokeStyle = CHART_MAIN_COLOR; // 선 색상
    ctx.lineWidth = 3; // 선 간격
    ctx.setLineDash([5, 5]); // 선의 길이: 5 ,선의 간격 : 5
    ctx.moveTo(chartArea.left, chartArea.bottom); // 시작점으로 이동
    ctx.lineTo(chartArea.right, chartArea.bottom); // 선의 끝점으로 이동
    ctx.stroke(); // 선을 그린다.
    ctx.restore();
  },
};

const ChartBar = () => {
  const { data } = useManagementState();

  return (
    <div className={styles['bar-wrapper']}>
      {data.length !== 0 && (
        <Bar
          data={{
            datasets: [
              {
                data,
                backgroundColor: data.map((_, i) => {
                  const bgColor = i === data.length - 1 ? CHART_MAIN_COLOR : '#ccc';
                  return bgColor;
                }),
                barThickness: 90,
                maxBarThickness: 120,
              },
            ],
          }}
          options={{
            elements: {
              bar: {
                borderRadius: 12,
              },
            },
            layout: {
              padding: 20,
            },
            scales: {
              x: {
                border: {
                  width: 3,
                  color: '#ccc',
                  display: false, // chartBackgrounArea의 x축 border
                },
                grid: {
                  display: false, // chartBackgroundArea의 세로선
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
                  const color = value.dataset.data.length - 1 === value.dataIndex ? 'black' : ' red';
                  return color;
                }, // 바 위에 뜬 value에 대한 color 조절 입니다.
                anchor: 'end',
                align: 'end',
                offset: 3,
                clamp: true,
                formatter(value) {
                  const koWon = convertNumberToWon(value.y);
                  return koWon;
                },
              },
            },
          }}
          plugins={[chartXAxisBorder]}
        />
      )}
    </div>
  );
};

export default ChartBar;