import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import {GrabButtonColors, GrabTextColors} from './Utility';
import { Icon } from '@iconify/react';
import Budget from './Budget';
import Remaining from './Remaining';
import ExpenseTotal from './ExpenseTotal';
import ExpenseList from './ExpenseList';
import AddExpenseForm from './AddExpenseForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import AnalyzeList from './AnalyzeList';
import Customize from './Customize';
const ExpenseButtons = () => {


	const [view, setView] = useState('expenseList');
	const [sort, setSort] = useState('sortTimestamp');
	const [reverse, setReverse] = useState('false');
	const [edit, setEdit] = useState('false');
		return (
			<div>
			<div className="container mt-4">
				<h3 className='mt-3 text-center'> 
					Expenses
				</h3>
				<div className="d-flex mb-4 justify-content-center">
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} onClick={() => setView('expenseList')}>
					View
					</button>
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} onClick={() => setView('addList')}>
					Add
					</button>
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} onClick={() => setView('analyzeList')}>
					Analyze
					</button>
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} onClick={() => setView('Customize')}>
					Customize
					</button>
				</div>
			</div>
			
			{view === 'expenseList' ? (
		
				<div className="d-flex mb-4 justify-content-center">
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} onClick={() => setSort('sortName')}>
					Sort By Name 
					</button>
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} onClick={() => setSort('sortCost')}>
					Sort By Cost 
					</button>
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} onClick={() => setSort('sortTag')}>
					Sort By Tag
					</button>
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} onClick={() => setSort('sortTime')}>
					Sort By Expense Time
					</button>
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} onClick={() => setSort('sortTimestamp')}>
					Sort By Time Added 
					</button>
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} onClick={() => setSort('sortUpdatedTime')}>
					Sort By Time Updated 
					</button>
					{reverse === 'false' ? (
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} onClick={() => setReverse('true')}>
						<Icon icon="mdi:arrow-up-bold" />
					</button>
					) : (
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} onClick={() => setReverse('false')}>
						<Icon icon="mdi:arrow-down-bold" />
					</button>
					)}
					{edit === 'false' ? (
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} onClick={() => setEdit('true')}>
						<Icon icon="ph:magnifying-glass-bold" />
					</button>
					) : (
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} onClick={() => setEdit('false')}>
						<Icon icon="mdi:lead-pencil" />
					</button>
					)}
				</div>
					) : null }
			<div className="table-responsive" style={{maxHeight: '60vh', overflow: 'auto'}}>
					{view === 'expenseList' && <ExpenseList sort={sort} reverse={reverse} edit={edit} />}
					{view === 'addList' && <AddExpenseForm />}
					{view === 'analyzeList' && <AnalyzeList />}
					{view === 'Customize' && <Customize />}
			</div>
			</div>
		);
};

export default ExpenseButtons;