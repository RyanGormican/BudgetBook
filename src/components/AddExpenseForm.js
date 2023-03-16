import React, {useState} from 'react';

const AddExpenseForm = () => {
const [name,setName] = useState('');
const [cost,setCost] = useState('');
	return (
		<form>
			<div className='row'>
				<div className='col-sm'>
					<label for="name"> Name </label>
					<input 
						required='required' 
						type='text'
						className='form-control'
						id='name'
						value={name}
						onChange={(event)=> setName(event.target.value)}
					/>
				</div>
				<div className='col-sm'>
					<label for="cost"> Cost </label>
					<input 
						required='required' 
						type='text'
						className='form-control'
						id='name'
						value={cost}
						onChange={(event)=> setCost(event.target.value)}
					/>
				</div> 
				<div className='col-sm'>
					<button type='submit' className='btn btn-primary'>
					Save
					</button>
				</div> 
			</div>
		</form>
	);
};
export default AddExpenseForm;