import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Budget from './components/Budget';
import Remaining from './components/Remaining';
import ExpenseTotal from './components/ExpenseTotal';
import ExpenseList from './components/ExpenseList';
import AddExpenseForm from './components/AddExpenseForm';
import { GrabButtonColors, GrabTextColors } from './components/Utility';
import { AppProvider } from './context/AppContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import AnalyzeList from './components/AnalyzeList';
import Settings from './components/Settings';
import Customize from './components/Customize';
import Income from './components/Income';
import ExpenseButtons from './components/ExpenseButtons';
import Calendar from './components/Calendar';
import Export from './components/Export';
import './App.css';

const Container = () => {
    const [view, setView] = useState('Expenses');

    const renderView = () => {
        switch (view) {
            case 'Income':
                return (
                    <>
                        <Income />
                    </>
                );
            case 'Expenses':
                return (
                    <>
                        <ExpenseButtons />
                    </>
                );
            case 'Calendar':
                return (
                    <>
                        <Calendar />
                    </>
                );
            case 'Export':
                return (
                    <>
                        <Export />
                    </>
                );
                case 'Settings':
                return (
                    <>
                        <Settings />
                    </>
                );
                     case 'Analyze':
                return (
                    <>
                        <AnalyzeList />
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <h1 className='mt-3 text-center'>
                BudgetBook
            </h1>
            <span className='links'>
                <a href="https://www.linkedin.com/in/ryangormican/">
                    <Icon icon="mdi:linkedin" color="#0e76a8" width="60" />
                </a>
                <a href="https://github.com/RyanGormican/BudgetBook">
                    <Icon icon="mdi:github" color="#e8eaea" width="60" />
                </a>
                <a href="https://ryangormicanportfoliohub.vercel.app/">
                    <Icon icon="teenyicons:computer-outline" color="#199c35" width="60" />
                </a>
            </span>

            <div className='row text-center' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className='col-sm-4 d-flex justify-content-center align-items-center' style={{ minHeight: '50px' }}>
                    <Budget />
                </div>
                <div className='col-sm-4 d-flex justify-content-center align-items-center' style={{ minHeight: '50px' }}>
                    <Remaining />
                </div>
                <div className='col-sm-4 d-flex justify-content-center align-items-center' style={{ minHeight: '50px' }}>
                    <ExpenseTotal />
                </div>
            </div>

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
                		<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} onClick={() => setView('Analyze')}>
					Analyze
					</button>
            </div>

            {renderView()}
        </>
    );
};

export default Container;
