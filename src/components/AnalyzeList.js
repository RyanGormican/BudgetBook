import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
Chart.register(ArcElement, Tooltip, Legend);

const AnalyzeList = () => {
  const { expenses, settings, budget } = useContext(AppContext);

  const tagCosts = {};
  expenses.forEach((expense) => {
    const { tag, cost } = expense;
    if (tag in tagCosts) {
      tagCosts[tag] += (cost * 1.00 );
    } else {
      tagCosts[tag] = (cost * 1.00);
    }
  });

  const tags = Object.keys(tagCosts);
  const unusedBudget = budget - Object.values(tagCosts).reduce((acc, cost) => acc + cost, 0);


  const labels = tags.map((tag) => {
    const cost = tagCosts[tag];
    const percentage = ((cost/budget) * 100).toFixed(settings.decimalPrecision);
    return `${tag} (${percentage}%)`;
  }).concat(`Unused (${((unusedBudget/budget) * 100).toFixed(settings.decimalPrecision)}%)`);

  const data = [...Object.values(tagCosts), unusedBudget];
  const backgroundColor = labels.map(() => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r}, ${g}, ${b}, 0.6)`;
  });

  const costData = {
    labels: labels,
    datasets: [
      {
        label: 'Cost',
        data: data,
        backgroundColor: backgroundColor,
      },
    ],
    tooltips: {
      callbacks: {
        label: function (context) {
          const value = data[context.dataIndex];
          const percent = ((value / budget) * 100).toFixed(settings.decimalPrecision);
          return `${context.label}: $${value} (${percent}%)`;
        },
      },
    },
  };

  return (
    <div style={{ width:'50vw', height:'40vh'}}>
      <Pie data={costData} />
    </div>
  );
};

export default AnalyzeList;
