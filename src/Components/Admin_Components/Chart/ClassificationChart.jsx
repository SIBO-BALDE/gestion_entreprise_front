import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Chart.js v3 and later require this import

const ClassificationChart = ({ classificationData }) => {
  const [chartData, setChartData] = useState({
    labels: ['Insuffisant', 'Moyen', 'Bien', 'Excellent'],
    datasets: [
      {
        label: "Nombre de participant ayant eu",
        data: [], 
        backgroundColor: 'rgba(0, 69, 115, 0.2)',
        borderColor: 'rgb(0, 69, 115)',
        borderWidth: 2,
        barThickness: 100, // Spécifiez une épaisseur de barre fixe
        maxBarThickness: 100, 
      },
      // {
      //   label: "Nombre de participant total évalué",
      //   data: [],
      //   backgroundColor: 'rgba(255, 183, 3,0.2)',
      //   borderColor: 'rgb(255, 183, 3)',
      //   borderWidth: 2,
      // },
    ],
  });

  useEffect(() => {
    if (classificationData) {
      setChartData((prevData) => ({
        ...prevData,
        datasets: prevData.datasets.map((dataset, index) => {
          // Note: Assuming classificationData contains only one group's data for now
          // Update based on the correct data structure
          return {
            ...dataset,
            data: [
              classificationData.insuffisant ?? 0,
              classificationData.moyen ?? 0,
              classificationData.bien ?? 0,
              classificationData.excellent ?? 0,
            ],
          };
        }),
      }));
    }
  }, [classificationData]);

  return (
    <div className="chart-container container">
      {/* <h5 className='mt-4'>Classification des Utilisateurs Évalués</h5> */}
      <Bar
        data={chartData}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 10, // Taille de police des labels de la légende
                },
              },
            },
            title: {
              display: true,
              text: "Classification des Utilisateurs Évalués",
              font: {
                size: 16, // Taille de police du titre
              },
            },
            tooltip: {
              titleFont: {
                size: 12, // Taille de police du titre des tooltips
              },
              bodyFont: {
                size: 10, // Taille de police du corps des tooltips
              },
            },
          },
        }}
        className='cart-diagram-content'
      />
    </div>
  );
};

export default ClassificationChart;
