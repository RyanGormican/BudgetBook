import React, {useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import ViewBudget from './ViewBudget';
import EditBudget from './EditBudget';
import { GrabButtonColors, GrabTextColors } from './Utility';
const Budget = () => {
	const { budget, dispatch } = useContext(AppContext);
	const [isEditing, setIsEditing]= useState(false);

	const handleEditClick = () => {
		setIsEditing(true)
	};

	const handleSaveClick = (value) => {
		dispatch({
			type: 'SET_BUDGET',
			payload: value,
		});
		setIsEditing(false);
	};
	return (
		<div className = 'align-items-center justify-content-between'  >
			Budget: {budget}
		</div>
	);
};
export default Budget;