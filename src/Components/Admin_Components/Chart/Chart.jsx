import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const EvaluationCharts = ({ evaluation }) => {
  const prepareChartData = (questions) => {
    return questions.map(question => {
      const responseCounts = question.reponses.map(r => r.count);

      return {
        labels: question.reponses.map(r => r.reponse),
        datasets: [
          {
            data: responseCounts,
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',  // Couleur 1
              'rgba(255, 99, 132, 0.2)',  // Couleur 2
              'rgba(255, 206, 86, 0.2)',  // Couleur 3
              'rgba(54, 162, 235, 0.2)',  // Couleur 4
              'rgba(153, 102, 255, 0.2)', // Couleur 5
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',  // Bordure 1
              'rgba(255, 99, 132, 1)',  // Bordure 2
              'rgba(255, 206, 86, 1)',  // Bordure 3
              'rgba(54, 162, 235, 1)',  // Bordure 4
              'rgba(153, 102, 255, 1)', // Bordure 5
            ],
            borderWidth: 1,
          },
        ],
      };
    });
  };

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
        formatter: (value, context) => `${context.dataIndex}: ${Math.round(value)}%`,
      },
    },
    layout: {
      padding: {
        top: 30,
      },
    },
  };

  return (
    <div>
      {prepareChartData(evaluation.questions).map((chartData, index) => (
        <div key={index} className="card mb-3 p-3">
          <h5 className="card-text" style={{ color: '#004573' }}>
            <strong>Question:</strong> {evaluation.questions[index].nom}
          </h5>
          <Doughnut data={chartData} options={options} />
        </div>
      ))}
    </div>
  );
};

export default EvaluationCharts;
