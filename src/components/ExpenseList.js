import React, {useContext, useState, useEffect} from 'react';
import ExpenseItem from './ExpenseItem';
import { AppContext } from '../context/AppContext';
const ExpenseList = () => {
const { expenses, dispatch} = useContext(AppContext);
const [sort, setSort] = useState('sortTimestamp');
const sortExpenses = JSON.parse(JSON.stringify(expenses));
	useEffect(()=> {
	const now = new Date().toISOString();
	sortExpenses.forEach(expense => {
	console.log(expense);
		if (!expense.time){
		const updatedExpense = { ...expense, time: now };
		dispatch({ type: 'UPDATE_EXPENSE', payload: updatedExpense});
		}
		if (!expense.timestamp){
		const updatedExpense = { ...expense, timestamp: Date.now() };
		dispatch({ type: 'UPDATE_EXPENSE', payload: updatedExpense });
		}
		});
	}, [expenses]);
	switch (sort) {
		case 'sortName':
			sortExpenses.sort((a,b) => a.name.localeCompare(b.name));
			break;
		case 'sortCost':
			sortExpenses.sort((a,b) => a.cost-b.cost);
			break;
		case 'sortTag':
			sortExpenses.sort((a,b) => a.tag.localeCompare(b.tag));
			break;
		case 'sortTime':
			sortExpenses.sort((a,b) => Date.parse(b.time) - Date.parse(a.time));
			break;
		case 'sortTimestamp':
			sortExpenses.sort((a,b) => b.timestamp - a.timestamp);
			break;
		default:
			sortExpenses.sort((a,b) => b.timestamp - a.timestamp);
		}
return (
		<div>
		<div className="d-flex mb-4 justify-content-center">
					<button className = "btn btn-primary" onClick={() => setSort('sortName')}>
					Sort By Name 
					</button>
					<button className = "btn btn-primary" onClick={() => setSort('sortCost')}>
					Sort By Cost 
					</button>
					<button className = "btn btn-primary" onClick={() => setSort('sortTag')}>
					Sort By Tag
					</button>
					<button className = "btn btn-primary" onClick={() => setSort('sortTime')}>
					Sort By Expense Time
					</button>
					<button className = "btn btn-primary" onClick={() => setSort('sortTimestamp')}>
					Sort By Time Added 
					</button>
		</div>
		<div>
			<ul className='list-group'>
				{sortExpenses.map(((expense)=> (
					<ExpenseItem 
						id={expense.id} 
						name={expense.name} 
						cost={expense.cost}
						tag={expense.tag}
						time={expense.time}
						timestamp={expense.timestamp}/>
				)))}
			</ul>
		</div>
		</div>
		);
};
export default ExpenseList;