import React, { useState, useContext, useEffect } from 'react';
import { Icon } from '@iconify/react';
import Budget from './components/Budget';
import Remaining from './components/Remaining';
import ExpenseTotal from './components/ExpenseTotal';
import ExpenseList from './components/ExpenseList';
import AddExpenseForm from './components/AddExpenseForm';
import { AppProvider, AppContext} from './context/AppContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import AnalyzeList from './components/AnalyzeList';
import Settings from './components/Settings';
import Customize from './components/Customize';
import {GrabButtonColors} from './components/Utility';
import MainButtons from './components/MainButtons';
const App = () => {
	return (
		<AppProvider>
		<div className='container'>
			<h1 className ='mt-3 text-center'>
				BudgetBook
			</h1>
			<span>
				<a href="https://www.linkedin.com/in/ryangormican/">
					<Icon icon="mdi:linkedin" color="#0e76a8" width="40" />
				</a>
				<a href="https://github.com/RyanGormican/BudgetBook">
					<Icon icon="mdi:github" color="#e8eaea" width="40" />
				</a>
				<a href="https://ryangormicanportfoliohub.vercel.app/">
					<Icon icon="teenyicons:computer-outline" color="#199c35" width="40" />
				</a>
			</span>

			<div className='row mt-3'>
				<div className='col-sm'>
					<Budget />
				</div>
				<div className='col-sm'>
					<Remaining />
				</div>
				<div className='col-sm'>
					<ExpenseTotal />
				</div>
			</div>
			<MainButtons />
			</div>
		</AppProvider>
		
	);
};

export default App;
