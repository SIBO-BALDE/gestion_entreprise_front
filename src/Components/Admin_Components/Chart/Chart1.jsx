import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ['Projet1', 'Projet2', 'Autres 3'],
  datasets: [
    {
      data: [30, 20, 50],
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',  // Couleur 1
        'rgba(255, 99, 132, 0.2)',  // Couleur 2
        'rgba(255, 206, 86, 0.2)',  // Couleur 3
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',  // Bordure 1
        'rgba(255, 99, 132, 1)',  // Bordure 2
        'rgba(255, 206, 86, 1)',  // Bordure 3
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  aspectRatio: 1.5, // Ajuste la hauteur du graphique
  cutout: '77%',
  plugins: {
    legend: {
      position: 'bottom', // Positionne la légende en bas
    },
    labels: {
      font: {
        size: 15, // Ajustez la taille de la police ici
      },
    },
    datalabels: {
      color: 'red', // Couleur du texte
      font: {
        size: 12, // Taille de la police du texte
      },
      formatter: (value, context) => {
        return context.dataIndex + ': ' + Math.round(value) + '%';
      },
    },
  },
  layout: {
    padding: {
      top: 30, // Ajoute une marge supérieure de 20 pixels
    },
  },
};

export default function Chart1() {
  return (
    <div style={{ width: '400px', height: '400px' }}> {/* Ajuste la taille du conteneur ici */}
      <Doughnut data={data} options={options} plugins={[require('chartjs-plugin-datalabels')]} />
    </div>
  );
}
