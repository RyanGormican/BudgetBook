import React, {useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';

const Customize = () => {
	const { expenses, styles, dispatch } = useContext (AppContext);

	useEffect(()=>{
		const newTagsSet = new Set(expenses.map((expense)=> expense.tag));
	    const stylesSet = new Set(styles.map((style) => style.tag));
        const diffTags = [...newTagsSet].filter((tag) => !stylesSet.has(tag));

		if (diffTags.length > 0){
			const refreshStyles = [
				...styles,
				...diffTags.map((tag) => ({
					tag,
					color: "255,255,255,0.6",
					})),
			];
			dispatch({
				type:"UPDATE_STYLES",
				payload:refreshStyles,
			});
		}
	}, [expenses, styles, dispatch]);



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
				{styles?.length>0 && styles.map((style) => (
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