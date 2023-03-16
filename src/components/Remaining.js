import React,{useContext} from 'react';
import { AppContext} from '../context/AppContext';
const Remaining = () => {
	const { expense, budget } =useContext(AppContext);
	const totalExpenses = expenses.reduce((total,item)=>{
		return (total = total + item.cost)
	},0);
	return (
		<div className = 'alert alert-success'>
			<span>
			Remaining: ${buadget - totalExpenses}
			</span>
		</div>
	);
};
export default Remaining;