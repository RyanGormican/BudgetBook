import React, { useContext, useState } from 'react';
import {AppContext} from '../context/AppContext';
import { Icon } from '@iconify/react';
import { Tooltip } from 'react-tooltip'
import {renderToString} from 'react-dom/server';
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
	const renderTagList = (tagList) => {
		return tagList.map((tag) => (
			<p>
				{tag.tag}: ${tag.cost}
			</p>
		))
	}
	const tagArray = Object.keys(tagList).map((tag)=> {
		return {tag: tag, cost: tagList[tag]}
	})

	const tagString = tagArray.map((tag) => {
		return `${tag.tag}: $${tag.cost}`;
	}).join(', ');
	return (
		<div className = 'alert alert-primary'>
			<span>
			Spent: ${totalExpenses}
			</span>
			<a data-tooltip-id="tagList" data-tooltip-content={tagString} data-tooltip-place="bottom">
				<Icon icon="mdi:question-mark-circle"/>
			</a>
			<Tooltip id="tagList" />
		</div>
	);
};
export default ExpenseTotal;