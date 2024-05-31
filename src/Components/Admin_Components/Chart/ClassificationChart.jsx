import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Chart.js v3 and later require this import

const ClassificationChart = ({ classificationData }) => {
  const [chartData, setChartData] = useState({
    labels: ['Insuffisant', 'Moyen', 'Bien', 'Excellent'],
    datasets: [
      {
        label: "Nombre d'utilisateurs",
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if (classificationData) {
      setChartData((prevData) => ({
        ...prevData,
        datasets: [
          {
            ...prevData.datasets[0],
            data: [
              classificationData.insuffisant,
              classificationData.moyen,
              classificationData.bien,
              classificationData.excellent,
            ],
          },
        ],
      }));
    }
  }, [classificationData]);

  return (
    <div className="container">
      <h1>Classification des Utilisateurs Évalués</h1>
      <Bar
        data={chartData}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default ClassificationChart;
