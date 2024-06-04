import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
Chart.register(ArcElement, Tooltip, Legend);

const AnalyzeList = () => {
    const { expenses, settings, styles, budget } = useContext(AppContext);
    const [isOverBudget, setIsOverBudget] = useState(false);
    const tagCosts = {};

    // Calculate total cost for each tag
    expenses.forEach((expense) => {
        const { tag, cost } = expense;
        const numericCost = parseFloat(cost); // Convert cost to a number
        if (tag in tagCosts) {
            tagCosts[tag] += numericCost;
        } else {
            tagCosts[tag] = numericCost;
        }
    });

    // Calculate total cost and remaining budget
    const totalCost = Object.values(tagCosts).reduce((acc, cost) => acc + cost, 0);
    const remainingBudget = budget - totalCost;

    useEffect(() => {
        // Determine if user is over budget
        setIsOverBudget(totalCost > budget);
    }, [totalCost, budget]); // Update isOverBudget when totalCost or budget changes

    // Debugging: Log values to understand the calculations
    console.log('tagCosts:', tagCosts);
    console.log('totalCost:', totalCost);
    console.log('remainingBudget:', remainingBudget);

    // Generate labels and data for the pie chart, sorted by percentage
    const sortedTags = Object.keys(tagCosts).sort((a, b) => tagCosts[b] - tagCosts[a]);
    const labels = sortedTags.map(tag => {
        const cost = tagCosts[tag];
        const percentage = budget !== 0 ? ((cost / budget) * 100).toFixed(settings.decimalPrecision) : 0; // Ensure no division by zero
        return `${tag} (${percentage}%)`;
    }).concat(`Remaining (${((remainingBudget / budget) * 100).toFixed(settings.decimalPrecision)}%)`);

    const data = sortedTags.map(tag => tagCosts[tag]).concat(remainingBudget);

    // Debugging: Log labels to check their values
    console.log('labels:', labels);

    // Generate background colors for each tag
    const backgroundColor = sortedTags.map(tag => {
        const style = styles.find(s => s.tag === tag);
        return style ? `#${style.color}` : `rgb(0,0,255)`;
    }).concat(`rgb(192,192,192)`); // Assuming a default color for "Remaining"

    // Configure data for the pie chart
    const costData = {
        labels: labels,
        datasets: [
            {
                label: 'Cost',
                data: data,
                backgroundColor: backgroundColor,
            },
        ],
    };

    // Return the pie chart component
    return (
        <div style={{ width: '50vw', height: '40vh' }}>
            {isOverBudget ? (
                <div>
                    User's costs must be within the targeted budget in order to generate a pie chart
                </div>
            ) : (
                <Pie data={costData} />
            )}
        </div>
    );
};

export default AnalyzeList;
