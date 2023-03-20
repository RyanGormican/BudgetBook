import React, { useState } from 'react';

const EditBudget = (props) => {
		const [value, setValue] = useState(props.budget);
		const handleValueChange = (event) => {
			const newValue = parseFloat(event.target.value).toFixed(2);
			setValue(newValue);
		};
		return (
				<>
					<input
						required='required'
						type='number'
						class='form-control mr-3'
						id='name'
						min='0.01'
						step='0.01'
						value={value}
						onChange={handleValueChange}
					/>
					<button
						type='button'
						class='btn btn-primary'
						onClick={()=>props.handleSaveClick(value)}
					>
						Save
					</button>
				</>
		);
};

export default EditBudget;