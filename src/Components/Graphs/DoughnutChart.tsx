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
    <Box sx={{ width: '100%', height: { xs: 250, sm: 280 }, p: 2 }}>
      <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
        <Doughnut data={data} options={options} />
      </Box>
    </Box>
  );
};

export default DoughnutChart;
