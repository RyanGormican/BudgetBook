import React,{useContext} from 'react';
import { AppContext} from '../context/AppContext';
const Remaining = () => {
	const { expenses, budget } =useContext(AppContext);
	const totalExpenses = expenses.reduce((total,item)=>{
		return (total = total + item.cost*1.00) ;
	},0).toFixed(2);

	const alertType = totalExpenses > budget ? 'alert alert-danger' :'alert alert-success';
	return (
		<div className ={`alert ${alertType}` }>
			<span>
			Remaining: ${(budget - totalExpenses) * 1.00}
			</span>
		</div>
	);
};
export default Remaining;