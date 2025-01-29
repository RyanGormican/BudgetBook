import React from 'react';
import { GrabButtonColors, GrabTextColors } from './Utility';

const ViewButtons = ({ setView }) => {
    return (
        <div className='view-buttons mt-3 text-center'>
            <button
                className="btn"
                style={{ backgroundColor: GrabButtonColors(), color: GrabTextColors() }}
                onClick={() => setView('Income')}
            >
                Income
            </button>
            <button
                className="btn"
                style={{ backgroundColor: GrabButtonColors(), color: GrabTextColors() }}
                onClick={() => setView('Expenses')}
            >
                Expenses
            </button>
            <button
                className="btn"
                style={{ backgroundColor: GrabButtonColors(), color: GrabTextColors() }}
                onClick={() => setView('Calendar')}
            >
                Calendar
            </button>
            <button
                className="btn"
                style={{ backgroundColor: GrabButtonColors(), color: GrabTextColors() }}
                onClick={() => setView('Budget')}
            >
                Budget
            </button>
            <button
                className="btn"
                style={{ backgroundColor: GrabButtonColors(), color: GrabTextColors() }}
                onClick={() => setView('Export')}
            >
                Export
            </button>
            <button
                className="btn"
                style={{ backgroundColor: GrabButtonColors(), color: GrabTextColors() }}
                onClick={() => setView('Settings')}
            >
                Settings
            </button>
            <button
                className="btn"
                style={{ backgroundColor: GrabButtonColors(), color: GrabTextColors() }}
                onClick={() => setView('Analyze')}
            >
                Analyze
            </button>
            <button
                className="btn"
                style={{ backgroundColor: GrabButtonColors(), color: GrabTextColors() }}
                onClick={() => setView('Customize')}
            >
                Customize
            </button>
        </div>
    );
};

export default ViewButtons;
