import React from 'react';
import { GrabButtonColors, GrabTextColors } from './Utility';

const Export = () => {


    const handleExportData = () => {
        // Retrieve all data from local storage
        const allData = localStorage.getItem('BudgetBook');

        // Check if data exists
        if (allData) {
            const blob = new Blob([allData], { type: 'application/json' });
            const a = document.createElement('a');
            a.href = window.URL.createObjectURL(blob);
            a.download = 'budgetbook_data.json';
            a.click();
        } else {
            alert('No data found to export!');
        }
    };

    return (
        <div>
            <button className="btn" onClick={handleExportData} style={{ backgroundColor: GrabButtonColors(), color: GrabTextColors() }}>
                Export as JSON
            </button>
        </div>
    );
};

export default Export;

