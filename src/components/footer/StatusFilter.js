import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { statusFilterChanged, StatusFilters } from '../../redux/modules/filtersSlice';

const StatusFilter = () => {

    const dispatch = useDispatch();

    const statusSelected = (option) => {
        dispatch(statusFilterChanged(option))
    }

    const status = useSelector(state => state.filters.status);
    const renderStatus = Object.entries(StatusFilters).map(([key, value]) => {
        let className = status === value ? 'selected' : '';
        return (
            <li key={value}>
                <button
                    className={className}
                    onClick={() => { statusSelected(value) }}
                >{key}</button>
            </li>
        )
    })

    return (
        <div className='filters statusFilters'>
            <h5>Filter by Status</h5>
            <ul>
                {renderStatus}
            </ul>
        </div>
    );
}

export default StatusFilter;