import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Box } from '@mui/material';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Chart,
  ChartData,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

type DataLabelsContext = {
  chart: Chart;
};

const PieChart = () => {
  const data: ChartData<'pie'> = {
    labels: ['Completed', 'Pending', 'Overdue'],
    datasets: [
      {
        label: 'Tasks',
        data: [70, 20, 10],
        backgroundColor: [
          'rgba(204, 255, 204, 1)', // Pastel Green
          'rgba(255, 255, 204, 1)', // Pastel Yellow
          'rgba(255, 204, 204, 1)',
        ],
        borderColor: [
          'rgba(153, 255, 153, 1)',
          'rgba(255, 255, 153, 1)',
          'rgba(255, 153, 153, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      datalabels: {
        color: '#000',
        formatter: (value: number, context: DataLabelsContext) => {
          const dataset = context.chart.data.datasets[0];
          const total = dataset.data
            .filter((val): val is number => typeof val === 'number')
            .reduce((sum, val) => sum + val, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}%`;
        },
        font: {
          weight: 'bold' as const,
          size: 14,
        },
      },
    },
  };

  return (
    <Box sx={{ width: 300, height: 260, m: 2 }}>
      <Pie data={data} options={options} />
    </Box>
  );
};

export default PieChart;
