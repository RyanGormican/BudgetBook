import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
const EditBudget = (props) => {
		const [value, setValue] = useState(props.budget);
		const handleValueChange = (event) => {
			const newValue = parseFloat(event.target.value).toFixed(2);
			setValue(newValue);
		};

		const { settings, dispatch } = useContext (AppContext);
		const [buttonColors, setButtonColors] = useState(settings.buttonColors);
		const buttonStyle = { backgroundColor:buttonColors, color: "#FFFFFF"};
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
						class='btn'
						style={buttonStyle}
						onClick={()=>props.handleSaveClick(value)}
					>
						Save
					</button>
				</>
		);
};

export default EditBudget;