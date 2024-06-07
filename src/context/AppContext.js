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
        case 'UPDATE_EXPENSE':
            const changedExpenses = state.expenses.map((expense) => expense.id === action.payload.id ? action.payload : expense);
            return {
                ...state,
                expenses: changedExpenses
            };
        case 'ADD_INCOME':
            const incomes = [...state.incomes, action.payload];
            return {
                ...state,
                incomes: incomes,
            };
        case 'DELETE_INCOME':
            const updatedIncome = state.incomes.filter((income) => income.id !== action.payload);
            return {
                ...state,
                incomes: updatedIncome
            };
        case 'UPDATE_INCOME':
            const changedIncome = state.incomes.map((income) => income.id === action.payload.id ? action.payload : income);
            return {
                ...state,
                incomes: changedIncome
            };
        case 'SET_BUDGET':
            return {
                ...state,
                budget: action.payload,
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
    incomes: [
    { id: 1, name: 'Click on the Add button to get started with adding income!', cost: 20, tag: 'Hey', timestamp: new Date().getTime() },
    ],
    styles: [
        { tag: 'Hey', color: 'ADD8E5' },
    ],
};

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState, getStorage);

    // useEffect to merge old data format to new format on load
    useEffect(() => {
        const oldExpenses = JSON.parse(localStorage.getItem('BudgetBook-expenses'));
        const oldBudget = localStorage.getItem('BudgetBook-budget');
        const oldSettings = JSON.parse(localStorage.getItem('BudgetBook-settings'));
        const oldStyles = JSON.parse(localStorage.getItem('BudgetBook-styles'));

        const flattenExpenses = oldExpenses && oldExpenses.length > 0 ? oldExpenses.flat() : [];

        if (flattenExpenses.length > 0) {
            // Merge old expenses format to new format
            flattenExpenses.forEach((expense, index) => {
                const newExpense = {
                    ...expense,
                    id: state.expenses.length + 1, // Generate new IDs based on current state's length
                    timestamp: new Date().getTime() + index, // Add index to ensure unique timestamps
                };
                dispatch({ type: 'ADD_EXPENSE', payload: newExpense });
            });
            localStorage.removeItem('BudgetBook-expenses'); // Remove old expenses from localStorage
        }

        if (oldBudget !== null) {
            dispatch({ type: 'SET_BUDGET', payload: parseFloat(oldBudget).toFixed(2) });
            localStorage.removeItem('BudgetBook-budget'); // Remove old budget from localStorage
        }

        if (oldSettings !== null) {
            dispatch({ type: 'UPDATE_SETTINGS', payload: oldSettings });
            localStorage.removeItem('BudgetBook-settings'); // Remove old settings from localStorage
        }

        if (oldStyles !== null) {
            dispatch({ type: 'UPDATE_STYLES', payload: oldStyles });
            localStorage.removeItem('BudgetBook-styles'); // Remove old styles from localStorage
        }
    }, []);

 // useEffect to flatten nested arrays in expenses on load
useEffect(() => {
    const flattenNestedArrays = (expenses) => {
        // Flatten any nested arrays in expenses
        const flattenedExpenses = expenses.reduce((acc, curr) => {
            if (Array.isArray(curr)) {
                // If current item is an array, flatten it and add its items to acc
                return [...acc, ...curr];
                console.log("test");
            } else {
                // If current item is not an array, add it directly to acc
                return [...acc, curr];
            }
        }, []);
        return flattenedExpenses;
    };

    // Flatten any nested arrays in state.expenses
    const flattenedExpenses = flattenNestedArrays(state.expenses);
    
    // Update state.expenses with the flattened expenses
    dispatch({ type: 'SET_EXPENSES', payload: flattenedExpenses });
}, []);
    useEffect(() => {
        localStorage.setItem('BudgetBook', JSON.stringify(state));
    }, [state]);


    const initializeIncomes = () => {
    const storedData = JSON.parse(localStorage.getItem('BudgetBook'));
    if (!storedData || !storedData.hasOwnProperty('incomes')) {
        localStorage.setItem('BudgetBook', JSON.stringify({ ...storedData, incomes: [] }));
    }
};

     // Initialize incomes if missing
    useEffect(() => {
        initializeIncomes();
    }, []);

    return (
        <AppContext.Provider value={{
            budget: state.budget,
            expenses: state.expenses,
            settings: state.settings,
            styles: state.styles,
            incomes: state.incomes,
            dispatch,
        }}>
            {props.children}
        </AppContext.Provider>
    );
};
