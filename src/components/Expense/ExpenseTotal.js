import React, { useContext} from 'react';
import {AppContext} from '../../context/AppContext';
import { Icon } from '@iconify/react';
import { Tooltip } from 'react-tooltip';
import { GrabButtonColors, GrabTextColors } from '../Utility';
const ExpenseTotal = ({month,year}) => {
	const {expenses, settings, budget} = useContext(AppContext);
	



	
	return (
    <div>
        <span>
            Spent: ${getTotalExpenses(expenses, month, year)}
        </span>
        {getTotalExpenses(expenses, month, year) > 0 && (
            <a data-tooltip-id="tagList" data-tooltip-content={renderExpensesByTag(expenses, settings, month, year)} data-tooltip-place="bottom">
                <Icon icon="mdi:question-mark-circle"/>
            </a>
        )}
        {getTotalExpenses(expenses, month, year) > 0 && (
            <Tooltip id="tagList" />
        )}
    </div>
);


};
export default ExpenseTotal;

export 	const getTotalExpenses = (expenses, month,year) => {
    let totalExpenses = 0;

    expenses.forEach(expense => {
        const expenseDate = new Date(expense.time);
        const monthsElapsed = (year - expenseDate.getFullYear()) * 12 + (month - expenseDate.getMonth());

        // Calculate total recurring expenses for the month
        if (expense.isRecurring) {
            if (expense.recurringFrequency === 'monthly' && expenseDate.getTime() <= new Date(year, month, 1).getTime()) {
                const intervalMonths = expense.recurringInterval;

                if (monthsElapsed >= 0 && monthsElapsed % intervalMonths === 0) {
                    totalExpenses += parseFloat(expense.cost) * -1;
                }

            } else if (expense.recurringFrequency === 'daily') {
    const expenseDate = new Date(expense.time);
    expenseDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero
    const expenseTimestamp = expenseDate.getTime();
    const monthStartTimestamp = new Date(year, month, 1).getTime();
    const monthEndTimestamp = new Date(year, month + 1, 0).getTime();
    const intervalMillis = expense.recurringInterval * 24 * 60 * 60 * 1000; // Convert days to milliseconds

    let timestamp = expenseTimestamp;

    // Count the number of recurring expenses within the month
    while (timestamp <= monthEndTimestamp) {
        if (timestamp >= monthStartTimestamp) {
            totalExpenses += parseFloat(expense.cost) * -1;
        }
        timestamp += intervalMillis;
    }
}

        } else {
            // Add one-time expense to total if it falls within the month
            if (expenseDate.getMonth() === month && expenseDate.getFullYear() === year) {
                totalExpenses += parseFloat(expense.cost) * -1;
            }
        }
    });

    return -1*totalExpenses.toFixed(2);
};

export const renderExpensesByTag = (expenses,settings,month,year) => {
    const uniqueTags = [...new Set(expenses
        .filter(expense => {
            const expenseDate = new Date(expense.time);
            if (expense.isRecurring && expense.recurringFrequency === 'monthly') {
                const monthsElapsed = (year - expenseDate.getFullYear()) * 12 + (month - expenseDate.getMonth());
                const intervalMonths = expense.recurringInterval;
                return (
                    expenseDate.getTime() <= new Date(year, month, 1).getTime() &&
                    monthsElapsed >= 0 &&
                    monthsElapsed % intervalMonths === 0
                );
            } else if (expense.isRecurring && expense.recurringFrequency === 'daily') {
                const expenseTimestamp = expenseDate.getTime();
                const monthStartTimestamp = new Date(year, month, 1).getTime();
                const monthEndTimestamp = new Date(year, month + 1, 0).getTime();
                const intervalMillis = expense.recurringInterval * 24 * 60 * 60 * 1000; // Convert days to milliseconds
                let timestamp = expenseTimestamp;

                while (timestamp <= monthEndTimestamp) {
                    if (timestamp >= monthStartTimestamp) {
                        return true;
                    }
                    timestamp += intervalMillis;
                }

                return false;
            } else {
                return (
                    expenseDate.getMonth() === month &&
                    expenseDate.getFullYear() === year
                );
            }
        })
        .map(expense => expense.tag)
    )];
      uniqueTags.sort((tagA, tagB) => {
        const percentageA = getPercentageForTag(expenses, settings, month, year, tagA);
        const percentageB = getPercentageForTag(expenses, settings, month, year, tagB);
        return percentageB - percentageA;
    });
const tagContent = uniqueTags.map(tag => (
        `${tag}: ${getPercentageForTag(expenses, settings, month, year, tag)}%\n`
    )).join('');

    return tagContent;
};
export  const getPercentageForTag = (expenses,settings, month, year, tag) => {
    const tagExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.time);

        if (expense.isRecurring && expense.recurringFrequency === 'monthly') {
            const monthsElapsed = (year - expenseDate.getFullYear()) * 12 + (month - expenseDate.getMonth());
            const intervalMonths = expense.recurringInterval;
            return (
                expense.tag === tag &&
                expenseDate.getTime() <= new Date(year, month, 1).getTime() &&
                monthsElapsed >= 0 &&
                monthsElapsed % intervalMonths === 0
            );
        } else if (expense.isRecurring && expense.recurringFrequency === 'daily') {
           const expenseDate = new Date(expense.time);
    expenseDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero
    const expenseTimestamp = expenseDate.getTime();

            const monthStartTimestamp = new Date(year, month, 1).getTime();
            const monthEndTimestamp = new Date(year, month + 1, 0).getTime();
            const intervalMillis = expense.recurringInterval * 24 * 60 * 60 * 1000; // Convert days to milliseconds
            let timestamp = expenseTimestamp;
            let totalRecurringExpenses = 0;

            while (timestamp <= monthEndTimestamp) {
                if (timestamp >= monthStartTimestamp) {
                    totalRecurringExpenses++;
                }
                timestamp += intervalMillis;
            }

            return expense.tag === tag && totalRecurringExpenses > 0;
        } else {
            return (
                expenseDate.getMonth() === month &&
                expenseDate.getFullYear() === year &&
                expense.tag === tag
            );
        }
    });

    // Calculate the total expenses for the month, including recurring expenses
    const totalExpenses = getTotalExpenses(expenses,month,year);

    // Calculate the total expenses for the tag
    const tagTotal = tagExpenses.reduce((acc, expense) => {
        if (expense.isRecurring && expense.recurringFrequency === 'daily') {
              const expenseDate = new Date(expense.time);
             expenseDate.setHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to zero
            const expenseTimestamp = expenseDate.getTime();
            const monthStartTimestamp = new Date(year, month, 1).getTime();
            const monthEndTimestamp = new Date(year, month + 1, 0).getTime();
            const intervalMillis = expense.recurringInterval * 24 * 60 * 60 * 1000; // Convert days to milliseconds
            let timestamp = expenseTimestamp;
            let totalRecurringExpenses = 0;

            while (timestamp <= monthEndTimestamp) {
                if (timestamp >= monthStartTimestamp) {
                    totalRecurringExpenses++;
                }
                timestamp += intervalMillis;
            }

            return acc + (parseFloat(expense.cost) * -1 * totalRecurringExpenses);
        } else {
            return acc + parseFloat(expense.cost) * -1;
        }
    }, 0);

    // Calculate the percentage for the tag
    const percentage = ((tagTotal / totalExpenses) * 100).toFixed(settings.decimalPrecision) * -1;

    return percentage;
};
