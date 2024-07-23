import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import BudgetVisual from './components/BudgetVisual';
import Budget from './components/Budget';
import Remaining from './components/Remaining';
import ExpenseTotal from './components/Expense/ExpenseTotal';
import ExpenseList from './components/Expense/ExpenseList';
import AddExpenseForm from './components/Expense/AddExpenseForm';
import { GrabButtonColors, GrabTextColors } from './components/Utility';
import { AppProvider } from './context/AppContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import AnalyzeList from './components/AnalyzeList';
import Settings from './components/Settings';
import Customize from './components/Customize';
import Income from './components/Income/Income';
import ExpenseButtons from './components/Expense/ExpenseButtons';
import Calendar from './components/Calendar';
import Export from './components/Export';
import Feedback from './components/Feedback/Feedback';
import './App.css';


const Container = () => {
    const [view, setView] = useState('Expenses');
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth()+1);
     const [isModalOpen, setIsModalOpen] = useState(false);
const handleYearChange = (e) => {
    const value = e.target.value;
    const roundedValue = Math.round(Number(value));
    setYear(roundedValue);
};
const handleMonthChange = (e) => {
    let newMonth = Number(e.target.value);
    if (newMonth > 12) {
        setYear(year + Math.floor(newMonth / 12));
        newMonth = newMonth % 12;
    } else if (newMonth < 1) {
        setYear(year - 1);
        newMonth = 12 + (newMonth % 12);
    }
    setMonth(newMonth);
};

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
                      case 'Budget':
                return (
                    <>
                        <Budget />
                    </>
                );
                     case 'Analyze':
                return (
                    <>
                        <AnalyzeList />
                    </>
                );
                case 'Customize':
                return ( 
                <>
              <Customize />
                </>
                );
            default:
                return null;
        }
    };
const toggleFeedbackModal = () => {
    setIsModalOpen(!isModalOpen);
  };
    return (
        <>
            <h1 className='mt-3 text-center'>
                BudgetBook
            </h1>
             {isModalOpen && (
          <Feedback  isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
          )}
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
                 <div className="cursor-pointer" onClick={() => toggleFeedbackModal()}>
          <Icon icon="material-symbols:feedback"  width="60" />
        </div>
            </span>
 <div className='row text-center' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 0, backgroundColor: GrabButtonColors(), width: '40vw', height: '15vh', margin: '0 auto' }}>
                <div className='d-flex flex-column' style={{ flex: 1, alignItems: 'flex-start', position: 'relative' }}>
                    <div style={{ minHeight: '25px', padding: 0, minWidth: '25%', backgroundColor: 'white', padding: '2px' }}>
                        <BudgetVisual />
                    </div>
                    <div style={{ minHeight: '25px', padding: 0, minWidth: '25%', backgroundColor: 'white', padding: '2px' }}>
                        <Remaining  month={month-1} year={year} />
                    </div>
                    <div style={{ minHeight: '25px', padding: 0, minWidth: '25%', backgroundColor: 'white', padding: '2px' }}>
                        <ExpenseTotal month={month-1} year={year}/>
                    </div>
                 <div style={{ minHeight: '25px', padding: 0, width: '25%', backgroundColor: 'white', padding: '2px' }}>
        <input
        type="number"
        value={month}
        onChange={handleMonthChange}
        style={{width:'50%'}}
        step={1}
    />
                 <input
        type="number"
        value={year}
        onChange={handleYearChange}
        style={{width:'50%'}}
        step={1}
    />
</div>

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
                		<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} onClick={() => setView('Analyze')}>
					Analyze
					</button>
                    	<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} onClick={() => setView('Customize')}>
					Customize
					</button>
            </div>

            {renderView()}
        </>
    );
};

export default Container;
