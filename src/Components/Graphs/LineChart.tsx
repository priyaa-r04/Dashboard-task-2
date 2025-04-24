import { Line } from 'react-chartjs-2';
import { Box } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
} from 'chart.js';
import 'chartjs-plugin-annotation';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Sales over Time',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
        pointBackgroundColor: 'rgba(75,192,192,1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true, 
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'line'>) => {
            return `Value: ${context.raw}`; 
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    elements: {
      point: {
        radius: 4,
      },
    },
   
    annotation: {
      annotations: data.datasets[0].data.map((value, index) => ({
        type: 'label',
        xValue: data.labels[index],
        yValue: value,
        backgroundColor: 'rgba(75,192,192,1)', 
        font: {
          size: 12,
          weight: 'bold',
        },
        yAdjust: -15, 
        content: value.toString(), 
        color: 'rgba(75,192,192,1)', 
      })),
    },
  };

  return (
    <Box
      sx={{
        width: '100%',             
        maxWidth: '600px',         
        height: { xs: 250, sm: 300, md: 350 }, 
        margin: '0 auto',            
        padding: 2,                 
        overflow: 'hidden',         
      }}
    >
      <Box
        sx={{
          width: '100%',            
          height: '100%',          
          display: 'flex',         
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Line data={data} options={options} />
      </Box>
    </Box>
  );
};

export default LineChart;
