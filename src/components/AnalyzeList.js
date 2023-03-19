import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import{Chart, ArcElement, Tooltip, Legend} from 'chart.js';
import {Pie} from 'react-chartjs-2';
Chart.register(ArcElement, Tooltip, Legend);


 export const costData ={
  labels: [ ],
  datasets:[
  {
  label: 'Cost by Tag',
  data: [],
  backgroundColor: [


  ],
  },
  ],
  };

const AnalyzeList = () => {
  const { expenses } = useContext(AppContext);
  
 

  const tagCosts = {};
  expenses.forEach(expense => {
    const { tag, cost } = expense;
    if (tag in tagCosts) {
      tagCosts[tag] += cost;
    } else {
      tagCosts[tag] = cost;
    }
  });

  
  return (
    <div>
    <Pie data = {costData} />
    </div>
  );
};

export default AnalyzeList;
