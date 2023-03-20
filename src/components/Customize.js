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
					color: "0000FF",
					})),
			];
			dispatch({
				type:"UPDATE_STYLES",
				payload:refreshStyles,
			});
		}

		if (!stylesSet.has("Remaining")){
			const refreshStyles = [
				...styles,
				 {
					tag:"Remaining",
					color: "0000FF",
				 },
			];
			dispatch({
				type:"UPDATE_STYLES",
				payload:refreshStyles,
			});
		}

	}, [expenses, styles, dispatch]);

	const handleColorChange = (tag, e) =>{
		const updatedStyles = styles.map((style)=>{
			if (style.tag === tag) {
				return { 
					...style,
					color: e.target.value.substr(1), 
				};
			}
			return style;
		});
		dispatch({
			type: 'UPDATE_STYLES',
			payload: updatedStyles,
		});
	};
	const sortStyles =[...styles].sort((a,b) => a.tag.localeCompare(b.tag));

	return (
		<div>
				{sortStyles?.length>0 && sortStyles.map((style) => (
					<div className='row' key={style.tag}>
						<div className='col-sm'>
							<label htmlFor={style.tag}>{style.tag} : </label>
							<input
							type="color"
							id={style.tag}
							name={style.tag}
							value={`#${style.color}`}
							onChange={(e) => handleColorChange(style.tag, e)}
							/>
						</div>
					</div>
				))}
		</div>
	);
};
export default Customize;