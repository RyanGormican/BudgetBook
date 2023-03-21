import React, {useContext, useState} from 'react';
import ExpenseItem from './ExpenseItem';
import { AppContext } from '../context/AppContext';
const ExpenseList = () => {
const { expenses } = useContext(AppContext);
const [sort, setSort] = useState('sortTimestamp');
const sortExpenses = JSON.parse(JSON.stringify(expenses));
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
			sortExpenses.sort((a,b) => b.time - a.time);
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