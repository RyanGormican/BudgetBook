import { createContext, useReducer, useEffect } from 'react';

const AppReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            const expenses = [...state.expenses, action.payload];
            return {
                ...state,
                expenses: expenses,
            };
        case 'DELETE_EXPENSE':
            const updatedExpenses = state.expenses.filter((expense) => expense.id !== action.payload);
            return {
                ...state,
                expenses: updatedExpenses
            };
        case 'SET_BUDGET':
            return {
                ...state,
                budget: action.payload,
            };
        case 'UPDATE_EXPENSE':
            const changedExpenses = state.expenses.map((expense) => expense.id === action.payload.id ? action.payload : expense);
            return {
                ...state,
                expenses: changedExpenses
            };
        case 'UPDATE_SETTINGS':
            return {
                ...state,
                settings: action.payload
            };
        case 'UPDATE_STYLES':
            return {
                ...state,
                styles: action.payload
            };
        default:
            return state;
    }
};

const getStorage = () => {
    const appData = JSON.parse(localStorage.getItem('BudgetBook')) || initialState;
    return appData;
};

const initialState = {
    budget: 1000,
    expenses: [
        { id: 1, name: 'Click on the Add button to get started with adding expenses!', cost: 20, tag: 'Hey', timestamp: new Date().getTime() },
    ],
    settings: {
        decimalPrecision: 2,
        buttonColor: 'ADD8E6',
        buttonTextColor: 'FFFFFF'
    },
    styles: [
        { tag: 'Hey', color: 'ADD8E5' },
    ],
};

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState, getStorage);

    useEffect(() => {
        localStorage.setItem('BudgetBook', JSON.stringify(state));
    }, [state]);

    return (
        <AppContext.Provider value={{
            budget: state.budget,
            expenses: state.expenses,
            settings: state.settings,
            styles: state.styles,
            dispatch,
        }}>
            {props.children}
        </AppContext.Provider>
    );
};
