import { Line } from 'react-chartjs-2';
import { Box } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const LineChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales over Time',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };
  return (
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',   
      alignItems: 'center',       
      height: '100%',           
      width: '100%',             
    }}
  >
    <Box
      sx={{
        height: '100%',           
        width: '100%',            
        maxWidth: '400px',        
        paddingLeft: '8px',
      }}
    >
      <Line data={data} />
    </Box>
  </Box>
  );
};
export default LineChart;