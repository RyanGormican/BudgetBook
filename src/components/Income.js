import React, {useContext,useState} from 'react';
import { AppContext } from '../context/AppContext';
import { GrabButtonColors, GrabTextColors } from './Utility';
import ViewBudget from './ViewBudget';
import EditBudget from './EditBudget';
const Income = () => {
    const { expenses, budget, dispatch  } = useContext(AppContext);
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
        <div>
           {isEditing ? (
				<EditBudget handleSaveClick={handleSaveClick} budget={budget} />
			) : (
				<ViewBudget handleEditClick={handleEditClick} budget={budget} />
			)}
        </div>
    );
};

export default Income;
