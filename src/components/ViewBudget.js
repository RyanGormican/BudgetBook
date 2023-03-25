import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
const ViewBudget = (props) => {
		const { settings, dispatch } = useContext (AppContext);
		const buttonStyle = { backgroundColor:settings.buttonColors, color: "#FFFFFF"};
		return (
			<>
				<span> 
					Budget: ${props.budget}
				</span>
				<button type='button' className='btn' style={buttonStyle} onClick={props.handleEditClick}>
					Edit
				</button>
			</>
		);
};

export default ViewBudget;