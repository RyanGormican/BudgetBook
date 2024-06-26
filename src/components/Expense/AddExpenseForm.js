import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { v4 as uuidv4 } from 'uuid';
import { GrabButtonColors, GrabTextColors } from '../Utility';

const AddExpenseForm = () => {
  const { dispatch } = useContext(AppContext);
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [tag, setTag] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState('monthly');
  const [recurringInterval, setRecurringInterval] = useState('');

  const buttonStyle = { backgroundColor: GrabButtonColors(), color: GrabTextColors() };

  const onSubmit = (event) => {
    event.preventDefault();
    const now = new Date();
    const offsetMinutes = now.getTimezoneOffset();
    const offsetMilliseconds = offsetMinutes * 60 * 1000;
    const localTimestamp = now.getTime() - offsetMilliseconds;
    const localDate = new Date(localTimestamp);

    const expense = {
      id: uuidv4(),
      name: name,
      cost: parseFloat(cost).toFixed(2),
      tag: tag,
      time: localDate.toISOString().slice(0, 16),
      timestamp: new Date().getTime(),
      lastUpdated: new Date().getTime(),
      isRecurring: isRecurring,
      recurringFrequency: isRecurring ? recurringFrequency : null,
      recurringInterval: isRecurring ? parseInt(recurringInterval) : null,
    };

    dispatch({
      type: 'ADD_EXPENSE',
      payload: expense,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className='row'>
        <div className='col-sm'>
          <button className='btn' style={buttonStyle}>
            Name
          </button>
          <input
            required='required'
            type='text'
            className='form-control'
            id='name'
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className='col-sm'>
          <button className='btn' style={buttonStyle}>
            Cost
          </button>
          <input
            required='required'
            type='number'
            className='form-control'
            id='cost'
            min='0.01'
            step='0.01'
            value={cost}
            onChange={(event) => setCost(event.target.value)}
          />
        </div>
        <div className='col-sm'>
          <button className='btn' style={buttonStyle}>
            Tag
          </button>
          <input
            required='required'
            type='text'
            className='form-control'
            id='tag'
            value={tag}
            onChange={(event) => setTag(event.target.value)}
          />
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-sm'>
          <label>
            Recurring Expense
            <input
              type='checkbox'
              checked={isRecurring}
              onChange={(event) => setIsRecurring(event.target.checked)}
            />
          </label>
        </div>
        {isRecurring && (
          <>
            <div className='col-sm'>
              <label>
                Recurring Frequency
                <select
                  value={recurringFrequency}
                  onChange={(event) => setRecurringFrequency(event.target.value)}
                >
                  <option value='monthly'>Monthly</option>
                  <option value='daily'>Every X Days</option>
                </select>
              </label>
            </div>
            <div className='col-sm'>
              <label>
                Interval
                <input
                  type='number'
                  min='1'
                  value={recurringInterval}
                  onChange={(event) => setRecurringInterval(event.target.value)}
                />
              </label>
            </div>
          </>
        )}
      </div>
      <div className='row mt-3'>
        <div className='col-sm'>
          <button type='submit' className='btn' style={buttonStyle}>
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
