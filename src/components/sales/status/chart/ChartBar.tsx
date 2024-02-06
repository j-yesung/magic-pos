import useChartData from '@/hooks/service/sales/uesChartData';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import NoneSales from '../noneSales/NoneSales';
import styles from './styles/ChartBar.module.css';
// Chart.js를 사용하려면 먼저 library 등록을 해야합니다.
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

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
