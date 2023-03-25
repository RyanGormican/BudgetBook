import React, { useContext } from 'react';
import { Icon } from '@iconify/react';
import { AppContext } from '../context/AppContext';

const ExpenseItem = (props, {edit}) => {
  const { styles, dispatch } = useContext(AppContext);

  const handleDeleteExpense = () => {
    dispatch({
      type: 'DELETE_EXPENSE',
      payload: props.id,
    });
  };

  const handleNameChange = (event) => {
    const updatedExpense = { ...props, name: event.target.value };
    dispatch({
      type: 'UPDATE_EXPENSE',
      payload: updatedExpense,
    });
  };

  const handleTimeChange = (event) => {
    const updatedExpense = { ...props, time: event.target.value };
    dispatch({
      type: 'UPDATE_EXPENSE',
      payload: updatedExpense,
    });
  };

  const handleTagChange = (event) => {
    const updatedExpense = { ...props, tag: event.target.value };
    dispatch({
      type: 'UPDATE_EXPENSE',
      payload: updatedExpense,
    });
  };

  const handleCostChange = (event) => {
    const updatedExpense = { ...props, cost: event.target.value };
    dispatch({
      type: 'UPDATE_EXPENSE',
      payload: updatedExpense,
    });
  };

  const tagStyle = styles.find((style) => style.tag === props.tag)?.color ? '#' + styles.find((style) => style.tag === props.tag).color : '';
  const buttonStyle = { backgroundColor: tagStyle, color: '#FFFFFF' };
  const dateTimeString = props.time ? new Date(parseInt(props.time) * 1000).toISOString().slice(0, -8) : '';

  return (
  <div>
  	{edit === 'true' ? (
    <li className='list-group-item d-flex justify-content-between align-items-center'>
      <span className='btn' style={buttonStyle}>
        <input type='text' value={props.name} onChange={handleNameChange} />
      </span>
      <div>
        {props.time && (
          <span className='btn' style={buttonStyle}>
            <input type='datetime-local' value={props.time} onChange={handleTimeChange} />
          </span>
        )}
        <span className='btn' style={buttonStyle}>
          <input type='text' value={props.tag} onChange={handleTagChange} />
        </span>
        <span className='btn' style={buttonStyle}>
          <input type='number' min='0.01' step='0.01' value={props.cost} onChange={handleCostChange} />
        </span>
        <Icon icon='mdi:delete-circle' width='20' onClick={handleDeleteExpense} />
      </div>
    </li>
    ) : (
        <li className='list-group-item d-flex justify-content-between align-items-center'>
      <span className='btn' style={buttonStyle}>
        <input type='text' value={props.name} onChange={handleNameChange} />
      </span>
      <div>
        {props.time && (
          <span className='btn' style={buttonStyle}>
             {props.time}
          </span>
        )}
        <span className='btn' style={buttonStyle}>
            {props.tag}
        </span>
        <span className='btn' style={buttonStyle}>
          {props.cost} 
        </span>
        <Icon icon='mdi:delete-circle' width='20' onClick={handleDeleteExpense} />
      </div>
    </li>
    )};
</div>
  );
};

export default ExpenseItem;
