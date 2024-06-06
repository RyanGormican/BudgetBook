import React, { useState, useContext } from 'react';
import '../App.css';
import { AppContext } from '../context/AppContext';
import { Icon } from '@iconify/react';
import { Tooltip } from 'react-tooltip';
import { renderToString } from 'react-dom/server';

const Calendar = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const { expenses } = useContext(AppContext);

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
const getExpensesForDay = (day) => {
    const formattedDay = day < 10 ? `0${day}` : day.toString(); // Add leading zero if needed
    const formattedMonth = currentMonth + 1 < 10 ? `0${currentMonth + 1}` : currentMonth + 1; // Add leading zero if needed
    const formattedDate = `${currentYear}-${formattedMonth}-${formattedDay}`;

    // Filter regular expenses for the day

    const dayExpenses = expenses.filter(expense => {
      if (!expense.isRecurring){
        const expenseDate = new Date(expense.time);
        const expenseYear = expenseDate.getFullYear();
        const expenseMonth = expenseDate.getMonth() + 1 < 10 ? `0${expenseDate.getMonth() + 1}` : expenseDate.getMonth() + 1; // Add leading zero if needed
        const expenseDay = expenseDate.getDate() < 10 ? `0${expenseDate.getDate()}` : expenseDate.getDate(); // Add leading zero if needed
        const expenseDateString = `${expenseYear}-${expenseMonth}-${expenseDay}`;
        return expenseDateString === formattedDate;
        }
    });

    // Filter recurring expenses for the day and after the start date
    const recurringDayExpenses = expenses.filter(expense => {
        if (!expense.isRecurring) return false;
        if (expense.recurringFrequency === 'monthly') {
            const [year, month, dayOfMonth] = expense.time.split('T')[0].split('-');
    const expenseDate = new Date(expense.time);
    const expenseYear = expenseDate.getFullYear();
    const expenseMonth = expenseDate.getMonth();
    const expenseDay = expenseDate.getDate();
    
    // Check if the expense is for the current month and day and not the same as the current day
    if (currentMonth === expenseMonth && day === expenseDay && currentYear === expenseYear && day !== dayOfMonth) {
        return true;
    }

    // Calculate the difference in months between the current date and the expense date
    const differenceInMonths = (currentYear - expenseYear) * 12 + (currentMonth - expenseMonth);
    // Check if the difference in months is divisible by the recurring interval
    if (differenceInMonths >= 0 && differenceInMonths % parseInt(expense.recurringInterval) === 0) {
        // Check if the current day matches the expense day
        if (day === expenseDay) {
            return true;
        }
    }
    
    return false;
}

      if (expense.recurringFrequency === 'daily') {
    const [year, month, dayOfMonth] = expense.time.split('T')[0].split('-');
    const expenseDate = new Date(year, month - 1, dayOfMonth); // Month is 0-indexed in Date constructor
    const currentDate = new Date(currentYear, currentMonth, day);
    // Calculate the difference in days between the current date and the expense date
    const differenceInDays = Math.floor((currentDate.getTime() - expenseDate.getTime()) / (1000 * 60 * 60 * 24));
    // Check if the difference in days is divisible by the recurring interval
    if (differenceInDays >= 0 && differenceInDays % parseInt(expense.recurringInterval) === 0) {
        return true;
    }
    return false;
}





    });

    return [...dayExpenses, ...recurringDayExpenses];
};


    const getTotalExpensesForDay = (day) => {
        const expensesForDay = getExpensesForDay(day);
        const total = expensesForDay.reduce((acc, expense) => acc + parseFloat(expense.cost) * -1, 0);
        return total.toFixed(2);
    };

    const generateTooltipContent = (day) => {
        const expensesForDay = getExpensesForDay(day);
        if (expensesForDay.length === 0) return null;

        return `Expenses:\n${expensesForDay.map(expense => `${expense.name} - $${expense.cost}`).join('\n')}`;
    };

    const getTotalExpensesForMonth = () => {
        const totalExpenses = expenses
            .filter(expense => {
                const expenseDate = new Date(expense.time);
                return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
            })
            .reduce((acc, expense) => acc + parseFloat(expense.cost) * -1, 0);
        return totalExpenses.toFixed(2);
    };

    const getPercentageForTag = (tag) => {
        const tagExpenses = expenses
            .filter(expense => {
                const expenseDate = new Date(expense.time);
                return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear && expense.tag === tag;
            });
        const tagTotal = tagExpenses.reduce((acc, expense) => acc + parseFloat(expense.cost) * -1, 0);
        const totalExpenses = getTotalExpensesForMonth();
        return ((tagTotal / totalExpenses) * 100).toFixed(2);
    };

    const renderExpensesByTag = () => {
        const uniqueTags = [...new Set(expenses
            .filter(expense => {
                const expenseDate = new Date(expense.time);
                return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
            })
            .map(expense => expense.tag)
        )];

        return uniqueTags.map(tag => (
            <p key={tag}>
                {tag}: {getPercentageForTag(tag)}%
            </p>
        ));
    };

    return (
        <div className='calendar'>
            <div className='calendar-nav text-center'>
                <button onClick={goToPreviousMonth}>&lt;</button>
                <div>{`${currentMonth + 1}/${currentYear}`}</div>
                <button onClick={goToNextMonth}>&gt;</button>
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
                        {getExpensesForDay(day).length > 0 && (
                            <div style={{ color: getTotalExpensesForDay(day) < 0 ? 'red' : 'green' }}>
                                <div>
                                    ${getTotalExpensesForDay(day)}
                                </div>
                                <div>
                                    <a data-tooltip-id={`expenses-${day}`} className="tooltip-icon" data-tooltip-content={generateTooltipContent(day)} data-tooltip-place="bottom">
                                        <Icon icon="mdi:question-mark-circle" />
                                    </a>
                                </div>
                            </div>
                        )}
                        <Tooltip id={`expenses-${day}`} className="custom-tooltip">
                            {generateTooltipContent(day)}
                        </Tooltip>
                    </div>
                ))}
                {emptyDaysAfter.map((_, index) => (
                    <div key={`empty-after-${index}`} className='calendar-date empty'></div>
                ))}
            </div>
            <div className='text-center'>
                <p>Total Expenses: ${getTotalExpensesForMonth() * -1}</p>
                <p>
                    {renderExpensesByTag()}
                </p>
            </div>
        </div>
    );
};

export default Calendar;
