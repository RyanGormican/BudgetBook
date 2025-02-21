import React from 'react';
import { GrabButtonColors, GrabTextColors } from './Utility';
import { Icon } from '@iconify/react';

const ViewButtons = ({ setView }) => {
    return (
        <div className='view-buttons mt-3 text-center'>
            <button
                className="btn"
                style={{ backgroundColor: GrabButtonColors(), color: GrabTextColors() }}
                onClick={() => setView('Income')}
            >
                Income <Icon icon="majesticons:money-plus-line"/>
            </button>
            <button
                className="btn"
                style={{ backgroundColor: GrabButtonColors(), color: GrabTextColors() }}
                onClick={() => setView('Expenses')}
            >
                Expenses <Icon icon="majesticons:money-minus-line" />
            </button>
            <button
                className="btn"
                style={{ backgroundColor: GrabButtonColors(), color: GrabTextColors() }}
                onClick={() => setView('Budget')}
            >
                Budget <Icon icon="majesticons:money-line" />
            </button>
            <button
                className="btn"
                style={{ backgroundColor: GrabButtonColors(), color: GrabTextColors() }}
                onClick={() => setView('Analyze')}
            >
                Analyze <Icon icon="mdi:chart-line" />
            </button>
            <button
                className="btn"
                style={{ backgroundColor: GrabButtonColors(), color: GrabTextColors() }}
                onClick={() => setView('Calendar')}
            >
                Calendar <Icon icon="mdi:calendar" />
            </button>
            <button
                className="btn"
                style={{ backgroundColor: GrabButtonColors(), color: GrabTextColors() }}
                onClick={() => setView('Customize')}
            >
                Customize <Icon icon="mdi:art" />
            </button>
            <button
                className="btn"
                style={{ backgroundColor: GrabButtonColors(), color: GrabTextColors() }}
                onClick={() => setView('Settings')}
            >
                Settings <Icon icon="material-symbols:settings" />
            </button>
            <button
                className="btn"
                style={{ backgroundColor: GrabButtonColors(), color: GrabTextColors() }}
                onClick={() => setView('Export')}
            >
                Export <Icon icon="mdi:export"  />
            </button>
        </div>
    );
};

export default ViewButtons;
