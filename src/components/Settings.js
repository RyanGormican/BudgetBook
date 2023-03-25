import React, {useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';


const Settings = () => {
	const { settings, dispatch } = useContext (AppContext);
	const [decimalPrecision, setDecimalPrecision] = useState(settings.decimalPrecision);
	const [buttonColor, setButtonColor] = useState(settings.buttonColor)
	const [buttonTextColor, setButtonTextColor] = useState(settings.buttonTextColor)
	const buttonStyle = { backgroundColor: settings.buttonColor, color: settings.textColor};
	const updateSettings= ()=> {
		const setting ={
			... settings,
			decimalPrecision:parseInt(decimalPrecision),
			buttonColor:buttonColor,
			buttonTextColor:buttonTextColor || 'ffffff',
		};
		dispatch({
			type: 'UPDATE_SETTINGS',
			payload: setting
		});
	};
	useEffect(() => {
		updateSettings();
	}, [ decimalPrecision, buttonColor,buttonTextColor]);
	
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
				<div className='col-sm'>
							<label for='color'> Button Color </label>
							<input
							type="color"
							id='buttonColors'
							value={buttonColor}
							onChange={(event)=> setButtonColor(event.target.value)}
							/>
				</div>
				<div className='col-sm'>
							<label for='color2'> Button Text Color </label>
							<input
							type="color"
							id='textColors'
							value={buttonTextColor}
							onChange={(event)=> setButtonTextColor(event.target.value)}
							/>
				</div>
			</div>
	);
};
export default Settings;