import React, { useContext, useState } from 'react';
import {AppContext} from '../context/AppContext';
import { Icon } from '@iconify/react';
import { Tooltip } from 'react-tooltip'
const ExpenseTotal = () => {
	const {expenses} = useContext(AppContext);
	
	const totalExpenses = expenses.reduce((total,item) =>{
		return (total += item.cost);
	},0);
 

	return (
		<div className = 'alert alert-primary'>
			<span>
			Spent: ${totalExpenses}
			</span>
			<a data-tooltip-id="tagList" data-tooltip-content={tagList} data-tooltip-place="bottom">
				<Icon icon="mdi:question-mark-circle"/>
			</a>
			<Tooltip id="tagList" />
		</div>
	);
};
export default ExpenseTotal;