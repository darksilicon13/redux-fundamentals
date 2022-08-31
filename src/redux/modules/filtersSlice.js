import { createSlice } from "@reduxjs/toolkit";

export const StatusFilters = {
    All: 'all',
    Active: 'active',
    Completed: 'completed',
}
const initialState = {
    status: StatusFilters.All,
    colors: [],
}

// export const changeStatus = (payload) => {
//     return { type: 'filters/statusFilterChanged', payload };
// }

// export const changeColor = ({ color, changeType }) => {
//     return { type: 'filters/colorFilterChanged', payload: { color, changeType } }
// }

// // use the initialState as a default value
// export default function filtersReducer(state = initialState, action = {}) {
//     // The reducer normally looks at the action type field to decide what happens
//     switch (action.type) {
//         // Do something here based on the different types of actions
//         case 'filters/statusFilterChanged': {
//             return { ...state, status: action.payload };
//         }
//         case 'filters/colorFilterChanged': {
//             const { color, changeType } = action.payload;
//             const { colors } = state;
//             switch (changeType) {
//                 case 'added': {
//                     if (colors.includes(color)) {
//                         return state;
//                     }
//                     return { ...state, colors: state.colors.concat(color) };
//                 }
//                 case 'removed': {
//                     if (colors.includes(color)) {
//                         return {
//                             ...state,
//                             colors: state.colors.filter(existingColor => existingColor !== color)
//                         }
//                     }
//                     return state;
//                 }
//                 default:
//                     return state;
//             }
//         }
//         default:
//             // If this reducer doesn't recognize the action type, or doesn't 
//             // care about this specific action, return the existing state unchanaged
//             return state;
//     }
// }

//  Redux Toolkit
const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        statusFilterChanged: (state, action) => {
            state.status = action.payload;
        },
        colorFilterChanged: (state, action) => {
            const { color, changeType } = action.payload;
            const { colors } = state;
            switch (changeType) {
                case 'added': {
                    if (colors.includes(color)) {
                        break;
                    }
                    colors.push(color)
                    break;
                }
                case 'removed': {
                    if (colors.includes(color)) {
                        state.colors = colors.filter(c => c !== color);
                    }
                    break;
                }
                default:
                    break;
            }
        }
    }
}
)

export const {statusFilterChanged, colorFilterChanged} = filtersSlice.actions;

export default filtersSlice.reducer;

