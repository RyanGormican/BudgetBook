import React, {useContext, useState, useEffect} from 'react';
import ExpenseItem from './ExpenseItem';
import { AppContext } from '../context/AppContext';
const ExpenseList = ({ sort, reverse,edit}) => {
const { expenses, styles, dispatch} = useContext(AppContext);
const sortExpenses = JSON.parse(JSON.stringify(expenses));
	useEffect(()=> {
	const now = new Date;
	const offsetMinutes = now.getTimezoneOffset();
	const offsetMilliseconds = offsetMinutes * 60 * 1000;
	const localTimestamp = now.getTime() - offsetMilliseconds;
	const localDate = new Date(localTimestamp);
	sortExpenses.forEach(expense => {
		if (!expense.time){
		const updatedExpense = { ...expense, time: localDate.toISOString().slice(0,16) };
		dispatch({ type: 'UPDATE_EXPENSE', payload: updatedExpense});
		}
		if (!expense.timestamp){
		const updatedExpense = { ...expense, timestamp: new Date().getTime() };
		dispatch({ type: 'UPDATE_EXPENSE', payload: updatedExpense });
		}
		});
	}, [expenses]);

	useEffect(()=>{
		const newTagsSet = new Set(expenses.map((expense)=> expense.tag));
	    const stylesSet = new Set(styles.map((style) => style.tag));
        const diffTags = [...newTagsSet].filter((tag) => !stylesSet.has(tag));

		if (diffTags.length > 0){
			const refreshStyles = [
				...styles,
				...diffTags.map((tag) => ({
					tag,
					color: "0000FF",
					})),
			];
			dispatch({
				type:"UPDATE_STYLES",
				payload:refreshStyles,
			});
		}

		if (!stylesSet.has("Remaining")){
			const refreshStyles = [
				...styles,
				 {
					tag:"Remaining",
					color: "0000FF",
				 },
			];
			dispatch({
				type:"UPDATE_STYLES",
				payload:refreshStyles,
			});
		}

	}, [expenses, styles, dispatch]);

	switch (sort) {
		case 'sortName':
			sortExpenses.sort((a,b) => a.name.localeCompare(b.name));
			break;
		case 'sortCost':
			sortExpenses.sort((a,b) => a.cost-b.cost).reverse();
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
		case 'sortUpdatedTime':
			sortExpenses.sort((a,b) => b.lastUpdated - a.lastUpdated);
			break;
		default:
			sortExpenses.sort((a,b) => b.timestamp - a.timestamp);
		}
	if (reverse === 'true'){
		sortExpenses.reverse();
	}
return (
		<div>
		<div>
			<ul className='list-group'>
				{sortExpenses.map(((expense)=> (
					<ExpenseItem 
						id={expense.id} 
						name={expense.name} 
						cost={expense.cost}
						tag={expense.tag}
						time={expense.time}
						timestamp={expense.timestamp}
						edit={edit}
						/>
				)))}
			</ul>
		</div>
		</div>
		);
};
export default ExpenseList;