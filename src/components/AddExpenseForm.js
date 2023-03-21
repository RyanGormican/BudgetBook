import React, {useContext, useState} from 'react';
import {AppContext} from '../context/AppContext';
import {v4 as uuidv4} from 'uuid';
const AddExpenseForm = () => {
const {dispatch} = useContext(AppContext);
const [name,setName] = useState('');
const [cost,setCost] = useState('');
const [tag, setTag] = useState('');
const onSubmit = (event) =>{
	event.preventDefault();
	const now = new Date();
	const expense ={
		id:uuidv4(),
		name:name,
		cost: parseFloat(cost).toFixed(2),
		tag:tag,
		time:now.toISOString().slice(0,16),
		timestamp:new Date().getTime(),
	};

	dispatch({
		type: 'ADD_EXPENSE',
		payload: expense,

	});
};
	return (
		<form onSubmit={onSubmit}>
			<div className='row'>
				<div className='col-sm'>
					<label for='name'> Name </label>
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
					<label for='cost'> Cost </label>
					<input 
						required='required' 
						type='number'
						className='form-control'
						id='name'
						min="0.01"
						step="0.01"
						value={cost}
						onChange={(event)=> setCost(event.target.value)}
					/>
				</div> 
				<div className='col-sm'>
					<label for='cost'> Tag </label>
					<input 
						required='required' 
						type='text'
						className='form-control'
						id='name'
						value={tag}
						onChange={(event)=> setTag(event.target.value)}
					/>
				</div> 
				</div> 
				<div class='row mt-3'>
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