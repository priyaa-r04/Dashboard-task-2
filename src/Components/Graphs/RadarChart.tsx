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

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="flex justify-center items-center max-w-[400px] w-full h-[290px]">
        <Radar data={data} />
      </div>
    </div>
  );
};

export default RadarChart;
