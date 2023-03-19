import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import Budget from './components/Budget';
import Remaining from './components/Remaining';
import ExpenseTotal from './components/ExpenseTotal';
import ExpenseList from './components/ExpenseList';
import AddExpenseForm from './components/AddExpenseForm';
import { AppProvider} from './context/AppContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import AnalyzeList from './components/AnalyzeList';

const App = () => {
	const [view, setView] = useState('expenseList');
	const toggleView = () => {
		if(view === 'expenseList') {
			setView('analyzeList');
		} else {
			setView('expenseList');
		}

	}
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


			<div className="container mt-4">
				<h3 className='mt-3 text-center'> 
					Expenses
				</h3>
				<div className="d-flex mb-4 justify-content-center">
					<button className = "btn btn-primary" onClick={() => setView('expenseList')}>
					View
					</button>
					<button className = "btn btn-primary" onClick={toggleView}>
					Analyze
					</button>
				</div>
			</div>
			<table>
				<tbody>
				{view === 'expenseList' && <ExpenseList />}
				{view === 'analyzeList' && <AnalyzeList />}
				</tbody>
			</table>
			



			<h3 className='mt-3'>
			Add Expenses
			</h3> 
			<div className='row mt-3'>
				<div className='col-sm'>
					<AddExpenseForm />
				</div>
			</div>
			</div>
		</AppProvider>
		
	);
};

export default App;
