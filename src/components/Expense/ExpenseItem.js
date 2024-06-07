import React, { useContext } from 'react';
import { Icon } from '@iconify/react';
import { AppContext } from '../../context/AppContext';
import { GrabTextColors} from '../Utility';
const ExpenseItem = (props) => {
  const { styles, dispatch } = useContext(AppContext);

  const handleDeleteExpense = () => {
    dispatch({
      type: 'DELETE_EXPENSE',
      payload: props.id,
    });
  };

  const handleNameChange = (event) => {
    const updatedExpense = { ...props, name: event.target.value, lastUpdated:new Date().getTime()};
    dispatch({
      type: 'UPDATE_EXPENSE',
      payload: updatedExpense,
    });
  };

  const handleTimeChange = (event) => {
    const updatedExpense = { ...props, time: event.target.value, lastUpdated:new Date().getTime() };
    dispatch({
      type: 'UPDATE_EXPENSE',
      payload: updatedExpense,
    });
  };

  const handleTagChange = (event) => {
    const updatedExpense = { ...props, tag: event.target.value, lastUpdated:new Date().getTime() };
    dispatch({
      type: 'UPDATE_EXPENSE',
      payload: updatedExpense,
    });
  };

  const handleCostChange = (event) => {
    const updatedExpense = { ...props, cost: event.target.value, lastUpdated:new Date().getTime() };
    dispatch({
      type: 'UPDATE_EXPENSE',
      payload: updatedExpense,
    });
  };

  const tagStyle = styles.find((style) => style.tag === props.tag)?.color ? '#' + styles.find((style) => style.tag === props.tag).color : '';
  const buttonStyle = { backgroundColor: tagStyle, color: GrabTextColors() };
  const dateTimeString = props.time ? new Date(parseInt(props.time) * 1000).toISOString().slice(0, -8) : '';
 const itemDate = props.time
  ? new Date(props.time).toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  : '';

const itemTime = props.time
  ? new Date(props.time).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
  : '';

  return (
  <div>
  	{props.edit === 'true' ? (
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
       {props.name}
      </span>
      <div>
      {props.isRecurring && (
        <span className='btn' style={buttonStyle}>
        <Icon icon='material-symbols:repeat' width='20' />
        </span>
        )}
        {props.time && (
          <span className='btn' style={buttonStyle}>
             {itemDate} | {itemTime}
          </span>
        )}
        <span className='btn' style={buttonStyle}>
            {props.tag}
        </span>
        <span className='btn' style={buttonStyle}>
          ${props.cost} 
        </span>
      </div>
    </li>
    )}
</div>
  );
};

export default ExpenseItem;
