import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteTodo, selectColor, toggleTodo } from '../../redux/modules/todosSlice';
import { availableColors, capitalize } from '../colors';
import { ReactComponent as TimesSolid } from './times-solid.svg';

const TodoListItem = ({ id, text, completed, color }) => {

    console.log("Todo rendered");
    const dispatch = useDispatch();

    const colorOptions = availableColors.map(c => (
        <option key={c} value={c}>
            {capitalize(c)}
        </option>
    ))

    const onDelete = () => {
        dispatch(deleteTodo(id));
    }

    const onColorChanged = e => {
        dispatch(selectColor({ todoId: id, color: e.target.value }));
    }

    const onToggle = () => {
        dispatch(toggleTodo(id));
    }

    const listClass = completed ? 'completed' : ''

    return (
        <li className={listClass}>
            <div className='view'>
                <div className='segment label'>
                    <input
                        className="toggle"
                        type="checkbox"
                        checked={completed}
                        onChange={onToggle}
                    />
                    <label className='todo-text'>{text}</label>
                </div>
                <div className='segment buttons'>
                    <select
                        className='colorPicker'
                        value={color}
                        onChange={onColorChanged}
                        style={{ "color": color }}
                    >
                        <option value=""></option>
                        {colorOptions}
                    </select>
                    <button
                        className='destroy'
                        onClick={onDelete}>
                        <TimesSolid />
                    </button>
                </div>
            </div>
        </li>
    );
}

export default TodoListItem;