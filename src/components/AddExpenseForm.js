import React from 'react';

const AddExpenseForm = () => {
	return (
		<form>
			<div className='row'>
				<div className='col-sm'>
					<label for'name'> Name </label>
					<input 
						required='required' 
						type='text'
						className='form-control'
						id='name'
					</input>
				</div>
			</div>
		</form>
	);
};
export default AddExpenseForm;