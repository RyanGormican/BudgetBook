import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import {GrabButtonColors, GrabTextColors} from './Utility';
const ViewBudget = (props) => {
		const { settings, dispatch } = useContext (AppContext);
		const buttonStyle = { backgroundColor:GrabButtonColors(), color: GrabTextColors()};
		return (
			<>
				<span> 
					Monthly Budget: ${props.budget}
				</span>
				<button type='button' className='btn' style={buttonStyle} onClick={props.handleEditClick}>
					Edit
				</button>
			</>
		);
};

export default ViewBudget;