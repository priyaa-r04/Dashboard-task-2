import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const RadarChart = () => {
  const data = {
    labels: ['Login', 'Profile Update', 'Post', 'Comment', 'Like', 'Share'],
    datasets: [
      {
        label: 'User Activity Score',
        data: [65, 59, 90, 81, 56, 55],
        backgroundColor: 'rgba(135,206,250,0.3)',
        borderColor: 'rgba(135,206,250,1)',
        pointBackgroundColor: 'rgba(135,206,250,1)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const, 
      },
    },
  };

  return (
    <div className="w-full h-[260px] sm:h-[300px] p-2">
      <div className="relative w-full h-full max-w-[400px] mx-auto">
        <Radar data={data} options={options} />
      </div>
    </div>
  );
};

export default RadarChart;
