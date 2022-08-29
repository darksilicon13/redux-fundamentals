const initialState = {
    status: 'All',
    colors: [],
}

// use the initialState as a default value
export default function filtersReducer(state = initialState, action = {}) {
    // The reducer normally looks at the action type field to decide what happens
    switch (action.type) {
        // Do something here based on the different types of actions
        case 'filters/statusFilterChanged': {
            return { ...state, status: action.payload };
        }
        case 'filters/colorFilterChanged': {
            const { color, changeType } = action.payload;
            const { colors } = state;
            switch (changeType) {
                case 'added': {
                    if (colors.includes(color)) {
                        return state;
                    }
                    return { ...state, colors: state.colors.concat(color) };
                }
                case 'removed': {
                    if (colors.includes(color)) {
                        return {
                            ...state,
                            colors: state.colors.filter(existingColor => existingColor !== color)
                        }
                    }
                    return state;
                }
            }
        }
        default:
            // If this reducer doesn't recognize the action type, or doesn't 
            // care about this specific action, return the existing state unchanaged
            return state;
    }
}