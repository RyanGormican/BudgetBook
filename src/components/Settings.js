import React, {useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';


const Settings = () => {
	const { state, dispatch } = useContext (AppContext);
	const [decimalPrecision, setDecimalPrecision] = useState(state.settings.decimalPrecision);
	return (
		<div>
		</div>
	);
};
export default Settings;