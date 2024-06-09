import React, { useState, useContext } from 'react';
import '../App.css';
import { AppContext } from '../context/AppContext';
import { Icon } from '@iconify/react';
import { Tooltip } from 'react-tooltip';
import { renderToString } from 'react-dom/server';
import {getTotalExpenses, renderExpensesByTag,getPercentageForTag,getExpensesForDay} from './Expense/ExpenseTotal'
const Calendar = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const { expenses,incomes, settings } = useContext(AppContext);

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);

    const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const emptyDaysBefore = Array.from({ length: firstDayOfMonth }, (_, i) => i);
    const emptyDaysAfter = Array.from(
        { length: 7 - (emptyDaysBefore.length + daysInMonth) % 7 },
        (_, i) => i
    );

    const goToPreviousMonth = () => {
        setCurrentMonth(prevMonth => (prevMonth === 0 ? 11 : prevMonth - 1));
        setCurrentYear(prevYear => (currentMonth === 0 ? prevYear - 1 : prevYear));
    };

    const goToNextMonth = () => {
        setCurrentMonth(prevMonth => (prevMonth === 11 ? 0 : prevMonth + 1));
        setCurrentYear(prevYear => (currentMonth === 11 ? prevYear + 1 : prevYear));
    };



   const getIncomesForDay = (day) => {
    const formattedDay = day < 10 ? `0${day}` : day.toString(); // Add leading zero if needed
    const formattedMonth = currentMonth + 1 < 10 ? `0${currentMonth + 1}` : currentMonth + 1; // Add leading zero if needed
    const formattedDate = `${currentYear}-${formattedMonth}-${formattedDay}`;

    // Filter incomes for the day
    const dayIncomes = incomes.filter(income => {
        const incomeDate = new Date(income.time);
        const incomeYear = incomeDate.getFullYear();
        const incomeMonth = incomeDate.getMonth() + 1 < 10 ? `0${incomeDate.getMonth() + 1}` : incomeDate.getMonth() + 1; // Add leading zero if needed
        const incomeDay = incomeDate.getDate() < 10 ? `0${incomeDate.getDate()}` : incomeDate.getDate(); // Add leading zero if needed
        const incomeDateString = `${incomeYear}-${incomeMonth}-${incomeDay}`;
        return incomeDateString === formattedDate;
    });

    return dayIncomes;
};

const getTotalTransactionsForDay = (day) => {
    const expensesForDay = getExpensesForDay(expenses,day,currentMonth,currentYear);
    const incomesForDay = getIncomesForDay(day);

    const totalExpenses = expensesForDay.reduce((acc, expense) => acc + parseFloat(expense.cost) * -1, 0);
    const totalIncomes = incomesForDay.reduce((acc, income) => acc + parseFloat(income.cost), 0);

    return (totalExpenses + totalIncomes).toFixed(2);
};

const generateTooltipContent = (day) => {
    const expensesForDay = getExpensesForDay(expenses,day,currentMonth,currentYear);
    const incomesForDay = getIncomesForDay(day);

    let tooltipContent = '';
     if (incomesForDay.length > 0) {
        tooltipContent += 'Incomes:\n';
        tooltipContent += incomesForDay.map(income => `${income.name} - $${income.cost}`).join('\n');
    }
    if (expensesForDay.length > 0) {
        tooltipContent += 'Expenses:\n';
        tooltipContent += expensesForDay.map(expense => `${expense.name} - $${expense.cost}`).join('\n');
        tooltipContent += '\n';
    }

   

    return tooltipContent || null;
};


    return (
        <div className='calendar'>
          <div className='calendar-nav text-center'>
    <button onClick={goToPreviousMonth} style={{ display: 'inline-block' }}>&lt;</button>
    <div style={{ display: 'inline-block', margin: '0 10px' }}>{`${currentMonth + 1}/${currentYear}`}</div>
    <button onClick={goToNextMonth} style={{ display: 'inline-block' }}>&gt;</button>
</div>
            <div className='calendar-header'>
                {daysOfWeek.map(day => (
                    <div key={day} className='calendar-day'>
                        {day}
                    </div>
                ))}
            </div>
            <div className='calendar-body'>
                {emptyDaysBefore.map((_, index) => (
                    <div key={`empty-before-${index}`} className='calendar-date empty'></div>
                ))}
              {calendarDays.map(day => (
    <div key={day} className='calendar-date'>
        <div>{day}</div>
        {getExpensesForDay(expenses,day,currentMonth,currentYear).length > 0 || getIncomesForDay(day).length > 0 ? (
            <div style={{ color: getTotalTransactionsForDay(day) < 0 ? 'red' : 'green' }}>
                <div>
                    ${getTotalTransactionsForDay(day)}
                </div>
                <div>
                    <a
                        data-tooltip-id={`transactions-${day}`}
                        className="tooltip-icon"
                        data-tooltip-content={generateTooltipContent(day)}
                        data-tooltip-place="bottom"
                    >
                        <Icon icon="mdi:question-mark-circle" />
                    </a>
                </div>
            </div>
        ) : (
            <div> {/* days without transactions */}</div>
        )}
        <Tooltip id={`transactions-${day}`} className="custom-tooltip">
            {generateTooltipContent(day)}
        </Tooltip>
    </div>
))}

                {emptyDaysAfter.map((_, index) => (
                    <div key={`empty-after-${index}`} className='calendar-date empty'></div>
                ))}
            </div>
            <div className='text-center'>
                <p>Total Expenses: ${getTotalExpenses(expenses,currentMonth,currentYear) }</p>
                <p>
                    {renderExpensesByTag(expenses,settings, currentMonth,currentYear)}
                </p>
            </div>
        </div>
    );
};

export default Calendar;
