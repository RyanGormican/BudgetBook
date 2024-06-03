import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Budget from './components/Budget';
import Remaining from './components/Remaining';
import ExpenseTotal from './components/ExpenseTotal';
import ExpenseList from './components/ExpenseList';
import AddExpenseForm from './components/AddExpenseForm';
import {GrabButtonColors, GrabTextColors} from './components/Utility';
import { AppProvider } from './context/AppContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import AnalyzeList from './components/AnalyzeList';
import Settings from './components/Settings';
import Customize from './components/Customize';
import ExpenseButtons from './components/ExpenseButtons';
import Calendar from './components/Calendar';
import Container from './Container';
import './App.css';

const App = () => {
 

    return (
        <AppProvider>
            <div className='container'>
             <Container />
            </div>
        </AppProvider>
    );
};

export default App;
