import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import {getTotalExpenses} from './Expense/ExpenseTotal'

const Remaining = ({month,year}) => {
    const { expenses, budget } = useContext(AppContext);
    const remainingBudget = (budget - getTotalExpenses(expenses,month,year)).toFixed(2);
    const textColor = remainingBudget >= 0 ? 'green' : 'red';

    return (
        <div>
            <span style={{ color: textColor,backgroundColor:'white',padding:'2px',borderRadius:'5px'   }}>
                Remaining: ${remainingBudget}
            </span>
        </div>
    );
};

export default Remaining;
