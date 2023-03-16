import React, {useContext} from 'react';
import { Icon } from '@iconify/react';
const ExpenseItem = (props) => {
	const { dispatch } = useContext(AppContext);

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
				<span className='badge badge-primary badge-pill mr-3'>
				${props.cost}
				</span>
				<Icon icon="mdi:delete-circle" onClick={handleDeleteExpense}/>
			</div>
		</li>
	);
};
export default ExpenseItem;