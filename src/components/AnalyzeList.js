import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { renderExpensesByTag, getTotalExpenses,getExpensesForDay } from './Expense/ExpenseTotal';
import {GrabButtonColors, GrabTextColors} from './Utility';
Chart.register(ArcElement, Tooltip, Legend);

const AnalyzeList = () => {
    const { expenses, settings, styles, budget } = useContext(AppContext);
    const [isOverBudget, setIsOverBudget] = useState(false);
    const [tagCosts, setTagCosts] = useState({});
    const [remainingBudget, setRemainingBudget] = useState(0);
    const [view,setView] =useState('pie');
    const [startYear, setStartYear] = useState(new Date().getFullYear());
    const [startMonth, setStartMonth] = useState(new Date().getMonth() + 1);
    const [endYear, setEndYear] = useState(new Date().getFullYear());
    const [endMonth, setEndMonth] = useState(new Date().getMonth() + 1);

    const handleYearChange = (setter) => (e) => {
        const value = Math.round(Number(e.target.value));
        setter(value);
    };

    const handleMonthChange = (setter, relatedYearSetter) => (e) => {
        let newMonth = Number(e.target.value);
        if (newMonth > 12) {
            relatedYearSetter((prevYear) => prevYear + Math.floor(newMonth / 12));
            newMonth = newMonth % 12;
        } else if (newMonth < 1) {
            relatedYearSetter((prevYear) => prevYear - 1);
            newMonth = 12 + (newMonth % 12);
        }
        setter(newMonth);
    };

    useEffect(() => {
        const tagCosts = {};
        let totalCost = 0;

        let currentYear = startYear;
        let currentMonth = startMonth -1;

        while (currentYear < endYear || (currentYear === endYear && currentMonth <= endMonth)) {
            const tagContent = renderExpensesByTag(expenses, settings, currentMonth, currentYear);
            const monthlyTotal = getTotalExpenses(expenses, currentMonth, currentYear);

            tagContent.split('\n').forEach(tagPercentage => {
                const [tag, percentage] = tagPercentage.split(': ');
                if (tag && percentage) {
                    const numericPercentage = parseFloat(percentage);
                    const cost = (numericPercentage / 100) * monthlyTotal;
                    tagCosts[tag] = (tagCosts[tag] || 0) + cost;
                }
            });

            totalCost += monthlyTotal;

            if (currentMonth === 12) {
                currentMonth = 1;
                currentYear++;
            } else {
                currentMonth++;
            }
        }

        setTagCosts(tagCosts);
        setRemainingBudget(budget - totalCost);
        setIsOverBudget(totalCost > budget);
    }, [expenses, settings, budget, startMonth, startYear, endMonth, endYear]);

    const sortedTags = Object.keys(tagCosts).sort((a, b) => tagCosts[b] - tagCosts[a]);
    const labels = sortedTags.map(tag => {
        const cost = tagCosts[tag];
        const percentage = budget !== 0 ? ((cost / budget) * 100).toFixed(settings.decimalPrecision) : 0;
        return `${tag} (${percentage}%)`;
    }).concat(`Remaining (${((remainingBudget / budget) * 100).toFixed(settings.decimalPrecision)}%)`);

    const data = sortedTags.map(tag => tagCosts[tag]).concat(remainingBudget);

    const backgroundColor = sortedTags.map(tag => {
        const style = styles.find(s => s.tag === tag);
        return style ? `#${style.color}` : `rgb(0,0,255)`;
    }).concat(`rgb(192,192,192)`);

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

    return (
    <div >

        <div className="text-center" style={{ marginBottom: '20px' }}>
            Start
            <input
                type="number"
                value={startMonth}
                onChange={handleMonthChange(setStartMonth, setStartYear)}
                style={{ width: '75px' }}
                step={1}
            />
            <input
                type="number"
                value={startYear}
                onChange={handleYearChange(setStartYear)}
                style={{ width: '75px' }}
                step={1}
            />
            End
            <input
                type="number"
                value={endMonth}
                onChange={handleMonthChange(setEndMonth, setEndYear)}
                style={{ width: '75px' }}
                step={1}
            />
            <input
                type="number"
                value={endYear}
                onChange={handleYearChange(setEndYear)}
                style={{ width: '75px' }}
                step={1}
            />
        </div>
        	<div className="d-flex justify-content-center">
        	<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} onClick={() => setView('pie')}>
					Pie
			</button>
           
			</div>
         {view === 'pie' && (
    <div style={{ justifyContent: 'center', textAlign: 'center', display: 'flex', alignItems: 'center', height: '50vh' }}>
        {isOverBudget ? (
            <div>
                User's costs must be within the targeted budget in order to generate a pie chart
            </div>
        ) : (
            <Pie data={costData} />
        )}
    </div>
)}
    </div>
);

};

export default AnalyzeList;
