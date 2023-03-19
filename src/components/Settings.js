import React, {useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';


const Settings = () => {
	const { settings, dispatch } = useContext (AppContext);
	const [decimalPrecision, setDecimalPrecision] = useState(settings.decimalPrecision);

	
	const handleFormSubmit= (e)=> {
		e.preventDefault();
		const setting ={
			... settings,
			decimalPrecision:parseInt(decimalPrecision),
		};
		dispatch({
			type: 'UPDATE_SETTINGS',
			payload: setting
		});
	};
	return (
		<form onSubmit = {handleFormSubmit}>
			<div className='row'>
				<div className='col-sm'>
					<label for='name'> Decimal Precision </label>
					<input 
						required='required' 
						type='text'
						className='form-control'
						id='decimalPrecision'
						value={decimalPrecision}
						min="1"
						max="10"
						onChange={(event)=> setDecimalPrecision(event.target.value)}
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
export default Settings;