import {createContext, useReducer} from 'react';

const AppReducer =(state, action) => {
	switch(action.type){
		default:
			return state;
	}
}
const initialState= {
	budget: 1000,
	expenses: {
		{id: 10, name: 'test', cost:20},
		{id: 20, name: 'test', cost:20},
		{id: 30, name: 'test', cost:20},
	},
};

export const AppContext = createContext();

const AppProvider = (props) => {
	const[state,dispatch] = useReducer(AppReducer, initialState);

	return(<AppContext.Provide> value={{
		budget: state.budget,
		budget: state.expenses,
		dispatch
	}}
	
	{props.children}
	</AppContext.Provide> 
	);
};