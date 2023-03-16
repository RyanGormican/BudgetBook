import {createContext, useReducer} from 'react';

const AppReducer =(state, action) => {
	switch(action.type){
		case 'ADD_EXEPNSE':
			return {
				...state,
				expenses:[...state.expenses, action.payload],
			}
		default:
			return state;
	}
};
const initialState= {
	budget: 1000,
	expenses: [
		{id: 10, name: 'test', cost:20},
		{id: 20, name: 'test', cost:20},
		{id: 30, name: 'test', cost:20},
	],
};

export const AppContext = createContext();

export const AppProvider = (props) => {
	const[state,dispatch] = useReducer(AppReducer, initialState);

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