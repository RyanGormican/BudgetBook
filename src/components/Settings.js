import React, {useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';


const Settings = () => {
	const { settings, dispatch } = useContext (AppContext);
	const [decimalPrecision, setDecimalPrecision] = useState(settings.decimalPrecision);
	const handleFormSubmit= (e)=> {
		e.preventDefault();
		dispatch({
			type: 'UPDATE_SETTINGS',
			paylod: settings
		});
	};
	return (
		<form onSubmit = {handleFormSubmit}>
		<div>
		</div>
		</form>
	);
};
export default Settings;