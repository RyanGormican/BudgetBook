import React, {useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import {GrabButtonColors, GrabTextColors} from './Utility';

const Customize = () => {
	const { expenses, styles, settings, dispatch } = useContext (AppContext);
	const [buttonColor, setButtonColor] = useState(settings.buttonColor);
	const [buttonTextColor, setButtonTextColor] = useState(settings.buttonTextColor);
	const buttonStyle = { backgroundColor:GrabButtonColors(), color: GrabTextColors()};
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

		const updateSettings= ()=> {
		const setting ={
			... settings,
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
	}, [ buttonColor,buttonTextColor]);


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
				<div className='row'>
				{sortStyles?.length>0 && sortStyles.map((style) => (
					
						<div className='btn col-sm' key={style.tag}>
							<div htmlFor={style.tag}>{style.tag}  </div>
							<input
							type="color"
							id={style.tag}
							name={style.tag}
							value={`#${style.color}`}
							onChange={(e) => handleColorChange(style.tag, e)}
							/>
						</div>
				))}
				</div>
				<div className='row d-flex justify-content-center'>
					<div className='col-sm'>
							<div for='color' className="btn" style={buttonStyle}> Button Color </div>
							<input
							type="color"
							id='buttonColors'
							value={buttonColor}
							onChange={(event)=> setButtonColor(event.target.value)}
							/>
					</div>
					<div className='col-sm'>
							<div for='color2' className="btn"  style={buttonStyle}> Button Text Color </div>
							<input
							type="color"
							id='textColors'
							value={buttonTextColor}
							onChange={(event)=> setButtonTextColor(event.target.value)}
							/>
					</div>
				</div>
		</div>
		
	);
};
export default Customize;