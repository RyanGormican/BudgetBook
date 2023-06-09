import React, {useContext, useState} from 'react';
import {AppContext} from '../context/AppContext';
import {v4 as uuidv4} from 'uuid';
import {GrabButtonColors, GrabTextColors} from './Utility';
const AddExpenseForm = () => {
const {dispatch, style, settings} = useContext(AppContext);
const [name,setName] = useState('');
const [cost,setCost] = useState('');
const [tag, setTag] = useState('');
const buttonStyle = { backgroundColor: GrabButtonColors(), color: GrabTextColors()};
const onSubmit = (event) =>{
	event.preventDefault();
	const now = new Date();
	const offsetMinutes = now.getTimezoneOffset();
	const offsetMilliseconds = offsetMinutes * 60 * 1000;
	const localTimestamp = now.getTime() - offsetMilliseconds;
	const localDate = new Date(localTimestamp);
	const expense ={
		id:uuidv4(),
		name:name,
		cost: parseFloat(cost).toFixed(2),
		tag:tag,
		time:localDate.toISOString().slice(0,16),
		timestamp:new Date().getTime(),
		lastUpdated:new Date().getTime(),
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
					<button className='btn' style={buttonStyle}> Name </button>
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
					<button className='btn' style={buttonStyle}> Cost </button>
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
					<button className='btn' style={buttonStyle}> Tag </button>
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
					<button type='submit' className='btn' style={buttonStyle}>
					Save
					</button>
				</div>
			</div>
		</form>
	);
};
export default AddExpenseForm;