import React, {useContext, useState} from 'react';
import {AppContext} from '../context/AppContext';
import {v4 as uuidv4} from 'uuid';
import {GrabButtonColors, GrabTextColors} from './Utility';
import { Icon } from '@iconify/react';
const AddExpenseForm = () => {
const {dispatch, style, settings} = useContext(AppContext);
const [name,setName] = useState('');
const [cost,setCost] = useState('');
const [tags, setTags] = useState(['']);
const buttonStyle = { backgroundColor: GrabButtonColors(), color: GrabTextColors()};
const handleTagChange = (event, index)=>{
		const newTags = [...tags];
		newTags[index] = event.target.value;
		setTags(newTags);
	};
	const handleAddTag = () => {
		setTags([...tags,'']);
	};
	const handleRemoveTag = (index)=>{
		const newTags = [...tags];
		newTags.splice(index,1);
		setTags(newTags);
	};
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
		tag:tags,
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
				<div className='row'>
					<div className='col-sm'>
					<button className='btn' style={buttonStyle}> Tags </button>
				{tags.map((tag,index) => (
					<div key={index}>
					{index === tags.length - 1 && (
						<button className='btn' style={buttonStyle} onClick = {handleAddTag}> 
							<Icon icon="material-symbols:add" /> 
						</button>
					)}
					{tags.length > 1 && (
						<button className='btn' style={buttonStyle} onClick={()=> handleRemoveTag(index)}> 
							<Icon icon="ic:twotone-minus" />
						</button>
					)}
					<input 
						required='required' 
						type='text'
						className='form-control'
						id='name'
						value={tag}
						onChange={(event)=> handleTagChange(event, index)}
					/>
					</div> 
				))}
					</div>
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