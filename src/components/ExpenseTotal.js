import React, { useContext, useState } from 'react';
import {AppContext} from '../context/AppContext';
import { Icon } from '@iconify/react';
import { Tooltip } from 'react-tooltip'
const ExpenseTotal = () => {
	const {expenses} = useContext(AppContext);
	
	const totalExpenses = expenses.reduce((total,item) =>{
		return (total += item.cost);
	},0);
	
	const tagList = expenses.reduce((tag,item) =>{
		if(tag[item.tag]){
			tag[item.tag]+=item.cost;
		} else {
			tag[item.tag] = item.cost;
		}
		return tag;
	},{});
	const renderTagList = () => {
		return Object.keys(tagList).map((tag)=> (
			<li key={tag}>
				{tag}: ${tagList[tag]}
			</li>
		))
	}
	return (
		<div className = 'alert alert-primary'>
			<span>
			Spent: ${totalExpenses}
			</span>
			<a data-tooltip-id="tagList" data-tooltip-content={<ul>{renderTagList()} </ul>} data-tooltip-place="bottom">
				<Icon icon="mdi:question-mark-circle"/>
			</a>
			<Tooltip id="tagList" />
		</div>
	);
};
export default ExpenseTotal;