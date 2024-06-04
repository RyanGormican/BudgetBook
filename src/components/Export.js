import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import {GrabButtonColors, GrabTextColors} from './Utility';
const Export = () => {
    const { expenses } = useContext(AppContext);

    const handleExportExpenses = () => {
        
        const expensesData = JSON.stringify(expenses);

       
        const blob = new Blob([expensesData], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(blob);
        a.download = 'expenses.json'; 
        a.click();
    };

    return (
    <div>
        <button className="btn" onClick={handleExportExpenses} style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} >
            Export as JSON
        </button>
    </div>
    );
};

export default Export;
