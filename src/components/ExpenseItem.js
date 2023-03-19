import React, {useContext} from 'react';
import { Icon } from '@iconify/react';
import { AppContext } from '../context/AppContext';
const ExpenseItem = (props) => {
	const { dispatch } = useContext(AppContext);

	const date = props.timestamp ? new Date(props.timestamp) : new Date();
	const dateTimeString = date.toLocaleString()


	const handleDeleteExpense = () => {
		dispatch({
			type: 'DELETE_EXPENSE',
			payload: props.id,
		});
	};
	
	return (
		<li className='list-group-item d-flex justify-content-between align-items-center'>
			{props.name}
			<div>
				{props.timestamp && (
				<span className='btn btn-primary'>
				{dateTimeString}
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