import {createContext, useReducer} from 'react';

const AppReducer =(state, action) => {
	switch(action.type){

	}
}
const initialState= {
	budget: 1000,
	expense: {
		{id: 10, name: 'test', cost:20},
		{id: 20, name: 'test', cost:20},
		{id: 30, name: 'test', cost:20},
	},
};

export const AppContext = createContext();

const AppProvider = {props} => {
	const[state,dispatch] = useReducer(AppReducer, initialState);
}