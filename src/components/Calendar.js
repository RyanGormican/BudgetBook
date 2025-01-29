import React, { useState, useContext } from 'react';
import '../App.css';
import { AppContext } from '../context/AppContext';
import { Icon } from '@iconify/react';
import { getTotalExpenses, renderExpensesByTag, getExpensesForDay } from './Expense/ExpenseTotal';

const Calendar = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const { expenses, incomes, settings } = useContext(AppContext);
    const [selectedDay, setSelectedDay] = useState(null);

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
        const formattedDay = day < 10 ? `0${day}` : day.toString();
        const formattedMonth = currentMonth + 1 < 10 ? `0${currentMonth + 1}` : currentMonth + 1;
        const formattedDate = `${currentYear}-${formattedMonth}-${formattedDay}`;

        return incomes.filter(income => {
            const incomeDate = new Date(income.time);
            const incomeYear = incomeDate.getFullYear();
            const incomeMonth = incomeDate.getMonth() + 1 < 10 ? `0${incomeDate.getMonth() + 1}` : incomeDate.getMonth() + 1;
            const incomeDay = incomeDate.getDate() < 10 ? `0${incomeDate.getDate()}` : incomeDate.getDate();
            const incomeDateString = `${incomeYear}-${incomeMonth}-${incomeDay}`;
            return incomeDateString === formattedDate;
        });
    };

    const getTotalTransactionsForDay = (day) => {
        const expensesForDay = getExpensesForDay(expenses, day, currentMonth, currentYear);
        const incomesForDay = getIncomesForDay(day);
        const totalExpenses = expensesForDay.reduce((acc, expense) => acc + parseFloat(expense.cost) * -1, 0);
        const totalIncomes = incomesForDay.reduce((acc, income) => acc + parseFloat(income.cost), 0);
        return (totalExpenses + totalIncomes).toFixed(2);
    };

    const generateTooltipContent = (day) => {
        const expensesForDay = getExpensesForDay(expenses, day, currentMonth, currentYear);
        const incomesForDay = getIncomesForDay(day);

        let tooltipContent = '';
        if (incomesForDay.length > 0) {
            tooltipContent += 'Incomes:\n';
            tooltipContent += incomesForDay.map(income => `${income.name} - $${income.cost}`).join('\n');
        }
        if (expensesForDay.length > 0) {
            tooltipContent += 'Expenses:\n';
            tooltipContent += expensesForDay.map(expense => `${expense.name} - $${expense.cost}`).join('\n');
        }

        return tooltipContent || 'No transactions for this day';
    };

    const handleDayClick = (day) => {
        setSelectedDay(prevDay => (prevDay === day ? null : day)); // Toggle the selected day
    };

 return (
    <div className="calendar-container" style={{ display: 'flex', flexDirection: 'column' }}>
        {/* Top Section: Calendar and Details Box */}
        <div className="top-section" style={{ display: 'flex', flexDirection: 'row', marginBottom: '20px' }}>
            {/* Calendar */}
            <div className="calendar" style={{ flex: 1 }}>
                <div className="calendar-nav text-center">
                    <button onClick={goToPreviousMonth}>&lt;</button>
                    <div>{`${currentMonth + 1}/${currentYear}`}</div>
                    <button onClick={goToNextMonth}>&gt;</button>
                </div>
                <div className="calendar-header">
                    {daysOfWeek.map(day => (
                        <div key={day} className="calendar-day">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="calendar-body">
                    {emptyDaysBefore.map((_, index) => (
                        <div key={`empty-before-${index}`} className="calendar-date empty"></div>
                    ))}
                    {calendarDays.map(day => (
                        <div 
                            key={day} 
                            className={`calendar-date ${selectedDay === day ? 'selected' : ''}`} 
                            onClick={() => handleDayClick(day)}
                             style={{
                                backgroundColor: selectedDay === day ? '#d3d3d3' : 'transparent', 
                                    cursor: 'pointer' 
                                  }}
                            >
                            

                            <div>{day}</div>
                            {getExpensesForDay(expenses, day, currentMonth, currentYear).length > 0 || getIncomesForDay(day).length > 0 ? (
                                <div style={{ color: getTotalTransactionsForDay(day) < 0 ? 'red' : 'green' }}>
                                    <div>${getTotalTransactionsForDay(day)}</div>
                                    <div>
                                        <a 
                                            className="tooltip-icon" 
                                            data-tooltip={generateTooltipContent(day)}
                                        >
                                            <Icon icon="mdi:question-mark-circle" />
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div></div>
                            )}
                        </div>
                    ))}
                    {emptyDaysAfter.map((_, index) => (
                        <div key={`empty-after-${index}`} className="calendar-date empty"></div>
                    ))}
                </div>
            </div>

            {/* Details Box */}
            <div className={`calendar-details ${selectedDay !== null ? 'show' : ''}`} style={{ marginLeft: '20px', flex: 1 }}>
                <div className="details-box">
                    {selectedDay !== null ? (
                        <>
                            <h3>Details for {currentMonth + 1}.{selectedDay}.{currentYear}</h3>
                            {/* Incomes Table */}
                            <div className="income-list">
                                <h4>Incomes</h4>
                                {getIncomesForDay(selectedDay).length > 0 ? (
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {getIncomesForDay(selectedDay).map((income, index) => (
                                                <tr key={index}>
                                                    <td>{income.name}</td>
                                                    <td>${income.cost}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>No incomes for this day</p>
                                )}
                            </div>

                            {/* Expenses Table */}
                            <div className="expense-list">
                                <h4>Expenses</h4>
                                {getExpensesForDay(expenses, selectedDay, currentMonth, currentYear).length > 0 ? (
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {getExpensesForDay(expenses, selectedDay, currentMonth, currentYear).map((expense, index) => (
                                                <tr key={index}>
                                                    <td>{expense.name}</td>
                                                    <td>${expense.cost}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>No expenses for this day</p>
                                )}
                            </div>
                        </>
                    ) : (
                        <h3>Select a day to see details</h3>
                    )}
                </div>
            </div>
        </div>

        {/* Bottom Section: Total Expenses and Expenses by Tag */}
        <div className="text-center">
            <p>Total Expenses: ${getTotalExpenses(expenses, currentMonth, currentYear)}</p>
            <p>{renderExpensesByTag(expenses, settings, currentMonth, currentYear)}</p>
        </div>
    </div>
);

}

export default Calendar;
