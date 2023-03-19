import React, {useContext} from 'react';
import { Icon } from '@iconify/react';
import { AppContext } from '../context/AppContext';
const ExpenseItem = (props) => {
	const { dispatch } = useContext(AppContext);

	const date = props.time ? new Date(props.time) : new Date();
	const dateTimeString = date.toLocaleString()


	const handleDeleteExpense = () => {
		dispatch({
			type: 'DELETE_EXPENSE',
			payload: props.id,
		});
	};
	const theTime = props.time ? (
	<span className='btn btn-primary'>
				{theTime}
	</span>
	) : null;
	return (
		<li className='list-group-item d-flex justify-content-between align-items-center'>
			{props.name}
			<div>
				{theTime}
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