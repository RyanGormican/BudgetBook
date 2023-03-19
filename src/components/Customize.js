import React, {useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Customize = () => {
	const { expenses, styles, dispatch } = useContext (AppContext);

	
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
				{styles.map((style) => (
					<div className='row'>
						<div className='col-sm'>
							<li key={style.tag}>
								{style.tag} : {style.color}
							</li>
						</div>
					</div>
				))}
				<button type="submit"  className='btn btn-primary'> Update Styles </button>
			</form>
		</div>
	);
};
export default Customize;