import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import {GrabButtonColors} from './Utility';
import { Icon } from '@iconify/react';
import Budget from './Budget';
import Remaining from './Remaining';
import ExpenseTotal from './ExpenseTotal';
import ExpenseList from './ExpenseList';
import AddExpenseForm from './AddExpenseForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import AnalyzeList from './AnalyzeList';
import Settings from './Settings';
import Customize from './Customize';
const MainButtons = () => {


	const [view, setView] = useState('expenseList');
	const [sort, setSort] = useState('sortTimestamp');
	const [reverse, setReverse] = useState('false');
	


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
		};
		return (
			<div>
			<div className="container mt-4">
				<h3 className='mt-3 text-center'> 
					Expenses
				</h3>
				<div className="d-flex mb-4 justify-content-center">
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: "#FFFFFF"}} onClick={() => setView('expenseList')}>
					View
					</button>
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: "#FFFFFF"}} onClick={() => setView('addList')}>
					Add
					</button>
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: "#FFFFFF"}} onClick={() => setView('analyzeList')}>
					Analyze
					</button>
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: "#FFFFFF"}} onClick={() => setView('Customize')}>
					Customize
					</button>
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: "#FFFFFF"}} onClick={() => setView('Settings')}>
					Settings
					</button>
				</div>
			</div>
				{view === 'expenseList' ? (
		
				<div className="d-flex mb-4 justify-content-center">
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: "#FFFFFF"}} onClick={() => setSort('sortName')}>
					Sort By Name 
					</button>
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: "#FFFFFF"}} onClick={() => setSort('sortCost')}>
					Sort By Cost 
					</button>
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: "#FFFFFF"}} onClick={() => setSort('sortTag')}>
					Sort By Tag
					</button>
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: "#FFFFFF"}} onClick={() => setSort('sortTime')}>
					Sort By Expense Time
					</button>
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: "#FFFFFF"}} onClick={() => setSort('sortTimestamp')}>
					Sort By Time Added 
					</button>
					{reverse === 'false' ? (
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: "#FFFFFF"}} onClick={() => setReverse('true')}>
						<Icon icon="mdi:arrow-up-bold" />
					</button>
					) : (
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: "#FFFFFF"}} onClick={() => setReverse('false')}>
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
		);
};

export default MainButtons;