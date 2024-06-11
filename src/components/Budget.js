import React, { useContext, useState} from 'react';
import { AppContext } from '../context/AppContext';
import ViewBudget from './ViewBudget';
import EditBudget from './EditBudget';

const Budget = () => {
    const {budget, dispatch  } = useContext(AppContext);
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
        <div >
		<div className='text-center'>
      {isEditing ? (
				<EditBudget handleSaveClick={handleSaveClick} budget={budget} />
			) : (
				<ViewBudget handleEditClick={handleEditClick} budget={budget} />
			)}
			</div>
        </div>
    );
};
export default Budget;
