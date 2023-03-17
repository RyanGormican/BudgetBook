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
		default:
			return state;
	}
};
const getStorage = () => {
	const budget = localStorage.getItem('BudgetBook-budget') || initialState.budget;
	const expenses = JSON.parse(localStorage.getItem('BudgetBook-expenses')) || initialState.expenses;
	return {
		budget:parseFloat(budget).toFixed(2),
		expenses,
	};
};
const initialState= {
	budget: 1000,
	expenses: [
		{id: 1, name: 'Add Expenses Below!', cost:20, tag:'Hey'},
	],
};

export const AppContext = createContext();

export const AppProvider = (props) => {
	const[state,dispatch] = useReducer(AppReducer, initialState, getStorage);

	useEffect(() =>{
		localStorage.setItem('budget',state.budget);
		localStorage.setItem('expenses',JSON.stringify(state.expenses));
	},[state]);

	return(<AppContext.Provider value={{
		budget: state.budget,
		expenses: state.expenses,
		dispatch,
	}}
	> 
	
	{props.children}
	</AppContext.Provider> 
	);
};