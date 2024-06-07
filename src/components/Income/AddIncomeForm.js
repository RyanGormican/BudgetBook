import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AppContext } from '../../context/AppContext';

const AddIncomeForm = () => {
    const { dispatch } = useContext(AppContext);

    // State for form inputs
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [tag, setTag] = useState('');

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const now = new Date();
    const offsetMinutes = now.getTimezoneOffset();
    const offsetMilliseconds = offsetMinutes * 60 * 1000;
    const localTimestamp = now.getTime() - offsetMilliseconds;
    const localDate = new Date(localTimestamp);

        // Create income object
        const income = {
            id: uuidv4(),
            name: name,
            cost: parseFloat(cost).toFixed(2),
            tag: tag,
            time: localDate.toISOString().slice(0, 16), // Current date and time in ISO format
            timestamp: new Date().getTime(),
            lastUpdated: new Date().getTime(),
        };

        // Dispatch action to add income
        dispatch({ type: 'ADD_INCOME', payload: income });

        // Reset form inputs
        setName('');
        setCost('');
        setTag('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="cost">Cost:</label>
                <input
                    type="number"
                    id="cost"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="tag">Tag:</label>
                <input
                    type="text"
                    id="tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Income</button>
        </form>
    );
};

export default AddIncomeForm;
