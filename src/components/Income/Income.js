import React, {useContext,useState} from 'react';
import { AppContext } from '../../context/AppContext';
import { GrabButtonColors, GrabTextColors } from '../Utility';
import ViewBudget from '../ViewBudget';
import EditBudget from '../EditBudget';
import AddIncomeForm from './AddIncomeForm';
import IncomeList from './IncomeList';
import { Icon } from '@iconify/react';
const Income = () => {
    const {budget, dispatch  } = useContext(AppContext);
	const [isEditing, setIsEditing]= useState(false);
		const [sort, setSort] = useState('sortTimestamp');
	const [reverse, setReverse] = useState('false');
	const [edit, setEdit] = useState('false');
	const [view, setView] = useState('IncomeList');
	const handleEditClick = () => {
		setIsEditing(true)
	};

	const handleSaveClick = (value) => {
		dispatch({
			type: 'SET_BUDGET',
			payload: value,
		});
		setIsEditing(false);
	};
   

    return (
        <div>
		<div className="text-center">
			<h3 className='mt-3 text-center'> 
					Income
				</h3>
          
			</div>
			<div className="text-center">
				<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} onClick={() => setView('IncomeList')}>
					View
					</button>
			<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} onClick={() => setView('addIncome')}>
					Add
					</button>
			</div>
				{view === 'IncomeList' ? (
		
				<div className="d-flex mb-4 justify-content-center">
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} onClick={() => setSort('sortName')}>
					Sort By Name 
					</button>
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} onClick={() => setSort('sortCost')}>
					Sort By Cost 
					</button>
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} onClick={() => setSort('sortTag')}>
					Sort By Tag
					</button>
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} onClick={() => setSort('sortTime')}>
					Sort By Expense Time
					</button>
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} onClick={() => setSort('sortTimestamp')}>
					Sort By Time Added 
					</button>
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} onClick={() => setSort('sortUpdatedTime')}>
					Sort By Time Updated 
					</button>
					{reverse === 'false' ? (
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} onClick={() => setReverse('true')}>
						<Icon icon="mdi:arrow-up-bold" />
					</button>
					) : (
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} onClick={() => setReverse('false')}>
						<Icon icon="mdi:arrow-down-bold" />
					</button>
					)}
					{edit === 'false' ? (
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} onClick={() => setEdit('true')}>
						<Icon icon="ph:magnifying-glass-bold" />
					</button>
					) : (
					<button className="btn" style = {{ backgroundColor: GrabButtonColors(), color: GrabTextColors()}} onClick={() => setEdit('false')}>
						<Icon icon="mdi:lead-pencil" />
					</button>
					)}
				</div>
					) : null }
				<div className="table-responsive text-center" style={{maxHeight: '60vh', overflow: 'auto'}}>
					{view === 'addIncome' && <AddIncomeForm /> }
				    {view === 'IncomeList' && <IncomeList sort={sort} reverse={reverse} edit={edit} />}
			</div>
   
        </div>
    );
};

export default Income;
