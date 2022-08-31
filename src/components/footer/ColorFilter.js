import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { colorFilterChanged } from '../../redux/modules/filtersSlice';
import {availableColors, capitalize} from '../colors';

const ColorFilter = () => {

    const dispatch = useDispatch();

    const colorsSelected = (color, changeType) => {
        dispatch(colorFilterChanged({ color, changeType }));
    }
    const colors = useSelector(state => state.filters.colors);
    const colorFilters = availableColors.map(color => {
        const colorChecked = colors.includes(color);
        const changeType = colorChecked ? "removed" : "added";
        return (
            <li key={color}>
                <input
                    type='checkbox'
                    defaultChecked={colorChecked}
                    onClick={() => { colorsSelected(color, changeType) }}
                />
                <div className='color-block' style={{ "backgroundColor": color }}></div>
                <strong>{capitalize(color)}</strong>
            </li>
        )
    })

    return (
        <div className='filters colorFilters'>
            <h5>Filter by Color</h5>
            <ul>
                {colorFilters}
            </ul>
        </div>
    );
}

export default ColorFilter;