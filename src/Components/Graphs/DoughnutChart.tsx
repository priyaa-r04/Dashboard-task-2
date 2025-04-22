import { Doughnut } from 'react-chartjs-2';
import { Box } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);
const DoughnutChart = () => {
  const data = {
    labels: ['Free Users', 'Premium Users', 'Trial Users'],
    datasets: [
      {
        label: 'User Types',
        data: [120, 80, 40],
        backgroundColor: [
          'rgba(173,216,230,0.8)',
          'rgba(255,218,185,0.8)',
          'rgba(221,160,221,0.8)',
        ],
        borderColor: [
          'rgba(173,216,230,1)',
          'rgba(255,218,185,1)',
          'rgba(221,160,221,1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <Box sx={{ width: 300, height: 265, m: 2 }}>
      <Doughnut data={data} />
    </Box>
  );
};
export default DoughnutChart;