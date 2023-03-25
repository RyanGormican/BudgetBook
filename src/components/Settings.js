import React, {useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import {GrabButtonColors, GrabTextColors} from './Utility';

const Settings = () => {
	const { settings, dispatch } = useContext (AppContext);
	const [decimalPrecision, setDecimalPrecision] = useState(settings.decimalPrecision);
	const buttonStyle = { backgroundColor: settings.buttonColor, color: settings.textColor};
	const updateSettings= ()=> {
		const setting ={
			... settings,
			decimalPrecision:parseInt(decimalPrecision),
		};
		dispatch({
			type: 'UPDATE_SETTINGS',
			payload: setting
		});
	};
	useEffect(() => {
		updateSettings();
	}, [ decimalPrecision]);
	
	return (
			<div className='row'>
				<div className='col-sm'>
					<label for='name'> Decimal Precision </label>
					<input 
						required='required' 
						type='number'
						className='form-control'
						id='decimalPrecision'
						value={decimalPrecision}
						min="1"
						max="15"
						onChange={(event)=> setDecimalPrecision(event.target.value)}
					/>
				</div>
			</div>
	);
};
export default Settings;