import React, {useContext,  useEffect} from 'react';
import IncomeItem from './IncomeItem';
import { AppContext } from '../../context/AppContext';
const IncomeList = ({ sort, reverse,edit}) => {
const { incomes, styles, dispatch} = useContext(AppContext);
const sortIncomes = JSON.parse(JSON.stringify(incomes));
	useEffect(()=> {
	const now = new Date;
	const offsetMinutes = now.getTimezoneOffset();
	const offsetMilliseconds = offsetMinutes * 60 * 1000;
	const localTimestamp = now.getTime() - offsetMilliseconds;
	const localDate = new Date(localTimestamp);
	sortIncomes.forEach(income => {
		if (!income.time){
		const updatedIncome = { ...income, time: localDate.toISOString().slice(0,16) };
		dispatch({ type: 'UPDATE_INCOME', payload: updatedIncome});
		}
		if (!income.timestamp){
		const updatedIncome = { ...income, timestamp: new Date().getTime() };
		dispatch({ type: 'UPDATE_INCOME', payload: updatedIncome });
		}
		});
	}, [incomes]);
	
	useEffect(()=>{
		const newTagsSet = new Set(incomes.map((income)=> income.tag));
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

	}, [incomes, styles, dispatch]);

	switch (sort) {
		case 'sortName':
			sortIncomes.sort((a,b) => a.name.localeCompare(b.name));
			break;
		case 'sortCost':
			sortIncomes.sort((a,b) => a.cost-b.cost).reverse();
			break;
		case 'sortTag':
			sortIncomes.sort((a,b) => a.tag.localeCompare(b.tag));
			break;
		case 'sortTime':
			sortIncomes.sort((a,b) => Date.parse(b.time) - Date.parse(a.time));
			break;
		case 'sortTimestamp':
			sortIncomes.sort((a,b) => b.timestamp - a.timestamp);
			break;
		case 'sortUpdatedTime':
			sortIncomes.sort((a,b) => b.lastUpdated - a.lastUpdated);
			break;
		default:
			sortIncomes.sort((a,b) => b.timestamp - a.timestamp);
		}
	if (reverse === 'true'){
		sortIncomes.reverse();
	}
return (
		<div>
		<div>
			<ul className='list-group'>
				{sortIncomes.map(((income)=> (
					<IncomeItem 
						id={income.id} 
						name={income.name} 
						cost={income.cost}
						tag={income.tag}
						time={income.time}
						timestamp={income.timestamp}
						edit={edit}
						/>
				)))}
			</ul>
		</div>
		</div>
		);
};
export default IncomeList;