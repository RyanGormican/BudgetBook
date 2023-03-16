import React from 'react';
import { Icon } from '@iconify/react';
const ExpenseItem = (props) => {
	return (
		<li className='list-group-item d-flex justify-content-between align-items-center'>
			{props.name}
			<div>
				<span className='badge badge-primary badge-pill mr-3'>
				${props.cost}
				</span>
				<Icon icon="mdi:delete-circle" />
			</div>
		</li>
	);
};
export default ExpenseItem;