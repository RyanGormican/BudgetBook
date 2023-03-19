import {createContext, useReducer, useEffect} from 'react';

const AppReducer =(state, action) => {
	switch(action.type){
		case 'ADD_EXPENSE':
			const expenses = [...state.expenses, action.payload];
			localStorage.setItem('BudgetBook-expenses', JSON.stringify(expenses));
			return {
				...state,
				expenses: expenses,
			};
		case 'DELETE_EXPENSE':
			const updatedExpenses = state.expenses.filter((expense)=> expense.id !== action.payload);
			localStorage.setItem('BudgetBook-expenses', JSON.stringify(updatedExpenses));
			return {
				...state,
				expenses: updatedExpenses
			};
		case 'SET_BUDGET':
			localStorage.setItem('BudgetBook-budget', action.payload);
			return {
				...state,
				budget: action.payload,
			};
		case 'UPDATE_SETTINGS':
			localStorage.setItem('BudgetBook-settings', action.payload);
			return {
				...state,
				settings: action.payload
			}
		default:
			return state;
	}
};
const getStorage = () => {
	const budget = localStorage.getItem('BudgetBook-budget') || initialState.budget;
	const expenses = JSON.parse(localStorage.getItem('BudgetBook-expenses')) || initialState.expenses;
	const settings = JSON.parse(localStorage.getItem('BudgetBook-settings')) || initialState.settings;
	return {
		budget:parseFloat(budget).toFixed(2),
		expenses,
		settings,
	};
};
const initialState= {
	budget: 1000,
	expenses: [
		{id: 1, name: 'Click on the Add button to get started with adding expenses!', cost:20, tag:'Hey'},
	],
	settings: {
		decimalPrecision: 2,
	}
};

export const AppContext = createContext();

export const AppProvider = (props) => {
	const[state,dispatch] = useReducer(AppReducer, initialState, getStorage);

	useEffect(() =>{
		localStorage.setItem('budget',state.budget);
		localStorage.setItem('expenses',JSON.stringify(state.expenses));
		localStorage.setItem('settings',JSON.stringify(state.settings));
	},[state]);

	return(<AppContext.Provider value={{
		budget: state.budget,
		expenses: state.expenses,
		settings: state.settings,
		dispatch,
	}}
	> 
	
	{props.children}
	</AppContext.Provider> 
	);
};