import useChartData from '@/hooks/sales/uesChartData';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import NoneSales from '../noneSales/NoneSales';
import styles from './styles/ChartBar.module.css';
// Chart.js를 사용하려면 먼저 library 등록을 해야합니다.
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

/**
 *  chat.js의 plugin객체인데, chart component의 option의 plugin에 id 값을 입력하면 사용가능합니다
 *
 * chart component의 어디서든 재사용 가능하도록 하는것이 plugin 같습니다.
 */

const ChartBar = () => {
  const { data, options } = useChartData();
  return (
    <div className={styles.barWrapper}>
      {data.datasets[0].data.length !== 0 && <Bar data={data} options={options} />}

      {data.datasets[0].data.length === 0 && <NoneSales />}
    </div>
  );
};

export default ChartBar;
