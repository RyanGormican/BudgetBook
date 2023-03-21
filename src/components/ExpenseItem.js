import React, {useContext} from 'react';
import { Icon } from '@iconify/react';
import { AppContext } from '../context/AppContext';
const ExpenseItem = (props) => {
	const { dispatch } = useContext(AppContext);
	const handleDeleteExpense = () => {
		dispatch({
			type: 'DELETE_EXPENSE',
			payload: props.id,
		});
	};
	const handleTimeChange = (event) => {
		const updatedExpense = { ...props, time: event.target.value };
		dispatch({
			type: 'UPDATE_EXPENSE',
			payload: updatedExpense, 
		});
	};
	const dateTimeString = props.time ? new Date(parseInt(props.time)*1000).toISOString().slice(0,-8): '';
	return (
		<li className='list-group-item d-flex justify-content-between align-items-center'>
			{props.name}
			<div>
				{props.time && (
				<span className='btn btn-primary'>
				<input type="datetime-local"  value = {dateTimeString} onChange = {handleTimeChange} />
				</span> 
				)}
				<span className='btn btn-primary'>
				{props.tag}
				</span>
				<span className='btn btn-primary'>
				${props.cost}
				</span>
				<Icon icon="mdi:delete-circle" width="20" onClick={handleDeleteExpense}/>
			</div>
		</li>
	);
};
export default ExpenseItem;