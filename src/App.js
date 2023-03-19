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
import Settings from './components/Settings';

const App = () => {
	const [view, setView] = useState('expenseList');
	const toggleView = () => {
		if(view === 'expenseList') {
			setView('analyzeList');
		} else if (view === 'analyzeList'){
			setView('expenseList');
		} else if (view ==='addList') {
			setView('addList');
		} else if (view ==='Settings') {
			setView('Settings');
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
					<button className = "btn btn-primary" onClick={() => setView('addList')}>
					Add
					</button>
					<button className = "btn btn-primary" onClick={() => setView('analyzeList')}>
					Analyze
					</button>
						<button className = "btn btn-primary" onClick={() => setView('Settings')}>
					Settings
					</button>
				</div>
			</div>
			<div className="table-responsive" style={{maxHeight: '40vh', overflow: 'auto'}}>
					{view === 'expenseList' && <ExpenseList />}
					{view === 'addList' && <AddExpenseForm />}
					{view === 'analyzeList' && <AnalyzeList />}
					{view === 'Settings' && <Settings />}
			</div>
			</div>
		</AppProvider>
		
	);
};

export default App;
