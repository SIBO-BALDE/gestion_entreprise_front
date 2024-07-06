import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart2 = () => {
  const [data, setData] = useState({
    labels: ['Évalué', 'Non Évalué'],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: [
          'rgba(0, 69, 115, 0.2)',  // Couleur 1
          'rgba(255, 183, 3, 0.2)',  // Couleur 2
        ],
        borderColor: [
          'rgba(0, 69, 115, 1)',  // Bordure 1
          'rgba(255, 183, 3, 1)',  // Bordure 2
        ],
        borderWidth: 1,
      },
    ],
  });

  const options = {
    aspectRatio: 1.5,
    cutout: '77%',
    plugins: {
      legend: {
        position: 'bottom',
      },
      datalabels: {
        color: 'red',
        font: {
          size: 12,
        },
        formatter: (value) => {
          return Math.round(value) + '%';
        },
      },
    },
    layout: {
      padding: {
        top: 30,
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('tokencle');
      const role = localStorage.getItem('rolecle');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      try {
        if (token || role === 'Admin') {
          const totalResponse = await axios.get('https://api.myfeedback360.com/api/participants', config);
          const evaluatedResponse = await axios.get('https://api.myfeedback360.com/api/listes/total/utlisateur/evaluer', config);

          console.log('Total response data:', totalResponse.data);
          console.log('Evaluated response data:', evaluatedResponse.data);

          const totalParticipants = totalResponse.data.participants.length; // Utilise la longueur du tableau
          const evaluatedParticipants = evaluatedResponse.data.evaluatedUsers.length; // Utilise la longueur du tableau

          console.log('Total participants:', totalParticipants);
          console.log('Evaluated participants:', evaluatedParticipants);

          if (totalParticipants !== undefined && evaluatedParticipants !== undefined) {
            const nonEvaluatedParticipants = totalParticipants - evaluatedParticipants;
            console.log('Non evaluated participants:', nonEvaluatedParticipants);

            setData({
              labels: ['Évalué', 'Non Évalué'],
              datasets: [
                {
                  data: [evaluatedParticipants, nonEvaluatedParticipants],
                  backgroundColor: [
                    'rgba(0, 69, 115, 0.2)',  // Couleur 1
                    'rgba(255, 183, 3, 0.2)',  // Couleur 2
                  ],
                  borderColor: [
                    'rgba(0, 69, 115, 1)',  // Bordure 1
                    'rgba(255, 183, 3, 1)',  // Bordure 2
                  ],
                  borderWidth: 1,
                },
              ],
            });
          } else {
            console.error('Les valeurs des participants sont indéfinies');
          }
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ width: '400px', height: '100%' }} className='chart-diagram-main-circulaire'>
      <Doughnut data={data} options={options} plugins={[require('chartjs-plugin-datalabels')]} />
    </div>
  );
}

export default Chart2;
