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
const App = () => {
	const [view, setView] = useState('expenseList');
	const [sort, setSort] = useState('sortTimestamp');
	const [reverse, setReverse] = useState('false');
	const { settings } = useContext(AppContext);
	const toggleView = () => {
		if(view === 'expenseList') {
			setView('analyzeList');
		} else if (view === 'analyzeList'){
			setView('expenseList');
		} else if (view ==='addList') {
			setView('addList');
		}  else if (view ==='Customize') {
			setView('Customize');
		}else if (view ==='Settings') {
			setView('Settings');
		}

	}
	useEffect(() =>{
		const { settings } = useContext(AppContext);
		const buttonStyle = { backgroundColor: settings.buttonColors, color: "#FFFFFF"};
		setButtonStyle(buttonStyle);
		}, [settings]);
	const [buttonStyle, setButtonStyle] = useState({backgroundColor: settings.buttonColors, color: "#FFFFFF"});
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
					<button className="btn" style = {buttonStyle} onClick={() => setView('expenseList')}>
					View
					</button>
					<button className="btn"style = {buttonStyle} onClick={() => setView('addList')}>
					Add
					</button>
					<button className="btn"style = {buttonStyle} onClick={() => setView('analyzeList')}>
					Analyze
					</button>
					<button className="btn"style = {buttonStyle} onClick={() => setView('Customize')}>
					Customize
					</button>
					<button className="btn"style = {buttonStyle} onClick={() => setView('Settings')}>
					Settings
					</button>
				</div>
			</div>
		{view === 'expenseList' ? (
		
				<div className="d-flex mb-4 justify-content-center">
					<button className="btn"style = {buttonStyle} onClick={() => setSort('sortName')}>
					Sort By Name 
					</button>
					<button className="btn"style = {buttonStyle} onClick={() => setSort('sortCost')}>
					Sort By Cost 
					</button>
					<button className="btn"style = {buttonStyle} onClick={() => setSort('sortTag')}>
					Sort By Tag
					</button>
					<button className="btn"style = {buttonStyle} onClick={() => setSort('sortTime')}>
					Sort By Expense Time
					</button>
					<button className="btn"style = {buttonStyle} onClick={() => setSort('sortTimestamp')}>
					Sort By Time Added 
					</button>
					{reverse === 'false' ? (
					<button className="btn"style = {buttonStyle} onClick={() => setReverse('true')}>
						<Icon icon="mdi:arrow-up-bold" />
					</button>
					) : (
					<button className="btn"style = {buttonStyle} onClick={() => setReverse('false')}>
						<Icon icon="mdi:arrow-down-bold" />
					</button>
					)}
			</div>
					) : null }
			<div className="table-responsive" style={{maxHeight: '60vh', overflow: 'auto'}}>
					{view === 'expenseList' && <ExpenseList sort={sort} reverse={reverse} />}
					{view === 'addList' && <AddExpenseForm />}
					{view === 'analyzeList' && <AnalyzeList />}
					{view === 'Customize' && <Customize />}
					{view === 'Settings' && <Settings />}
			</div>
			</div>
		</AppProvider>
		
	);
};

export default App;
