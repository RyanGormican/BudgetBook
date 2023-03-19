import React, {useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';


const Customize = () => {
	const { styles, dispatch } = useContext (AppContext);

	
	const handleFormSubmit= (e)=> {
		e.preventDefault();
		const styles ={
			... styles,
		};
		dispatch({
			type: 'UPDATE_STYLES',
			payload: styles,
		});
	};
	return (
		<div>
			<form onSubmit = {handleFormSubmit}>
			
			</form>
		</div>
	);
};
export default Customize;