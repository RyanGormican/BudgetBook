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
		case 'UPDATE_EXPENSE':
			const changedExpenses = state.expenses.map((expense) => expense.id === action.payload.id ? action.payload : expense);
			localStorage.setItem('BudgetBook-expenses', JSON.stringify(changedExpenses));
			return {
				...state,
				expenses: changedExpenses
			};
		case 'UPDATE_SETTINGS':
			localStorage.setItem('BudgetBook-settings',  JSON.stringify(action.payload));
			return {
				...state,
				settings: action.payload
			};
		case 'UPDATE_STYLES':
			localStorage.setItem('BudgetBook-styles',  JSON.stringify(action.payload));
			return {
				...state,
				styles: action.payload
			};
		default:
			return state;
	}
};
const getStorage = () => {
	const budget = localStorage.getItem('BudgetBook-budget') || initialState.budget;
	const expenses = JSON.parse(localStorage.getItem('BudgetBook-expenses')) || initialState.expenses;
	const settings = JSON.parse(localStorage.getItem('BudgetBook-settings')) || initialState.settings;
	const styles = JSON.parse(localStorage.getItem('BudgetBook-styles')) || initialState.styles;
	return {
		budget:parseFloat(budget).toFixed(2),
		expenses,
		settings,
		styles,
	};
};
const initialState= {
	budget: 1000,
	expenses: [
		{id: 1, name: 'Click on the Add button to get started with adding expenses!', cost:20, tag:'Hey', timestamp:new Date().getTime()},
	],
	settings: {
		decimalPrecision: 2,
		buttonColors: '0000FF'
	},
	styles: [
		{tag:'Hey',color:'0000FF'},
	],
};

export const AppContext = createContext();

export const AppProvider = (props) => {
	const[state,dispatch] = useReducer(AppReducer, initialState, getStorage);

	useEffect(() =>{
		localStorage.setItem('budget',state.budget);
		localStorage.setItem('expenses',JSON.stringify(state.expenses));
		localStorage.setItem('settings',JSON.stringify(state.settings));
		localStorage.setItem('styles',JSON.stringify(state.styles));
	},[state]);

	return(<AppContext.Provider value={{
		budget: state.budget,
		expenses: state.expenses,
		settings: state.settings,
		styles: state.styles,
		dispatch,
	}}
	> 
	
	{props.children}
	</AppContext.Provider> 
	);
};