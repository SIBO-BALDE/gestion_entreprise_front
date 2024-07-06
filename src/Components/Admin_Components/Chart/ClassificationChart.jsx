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
        barThickness: 'flex', // Utiliser 'flex' pour une épaisseur de barre flexible
        maxBarThickness: 100, 
      },
    ],
  });

  useEffect(() => {
    if (classificationData) {
      setChartData((prevData) => ({
        ...prevData,
        datasets: prevData.datasets.map((dataset) => ({
          ...dataset,
          data: [
            classificationData.insuffisant ?? 0,
            classificationData.moyen ?? 0,
            classificationData.bien ?? 0,
            classificationData.excellent ?? 0,
          ],
        })),
      }));
    }
  }, [classificationData]);

  return (
    <div className="chart-container container" style={{ width: '100%', maxWidth: '536px', margin: '0 auto' }}>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false, // Permet à Chart.js d'ajuster le rapport hauteur/largeur automatiquement
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
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            },
          },
          barThickness: 'flex',
          maxBarThickness: 100,
        }}
        className='cart-diagram-content'
        height={400} // Définir une hauteur fixe pour le conteneur du diagramme
      />
    </div>
  );
};

export default ClassificationChart;
