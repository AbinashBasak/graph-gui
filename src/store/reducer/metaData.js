import initialState from './initialState';
import { ADD_EDGE, ADD_VERTEX, UPDATE_EDGE, UPDATE_VERTEX, UPDATE_CURRENT_OPERATIONS } from '../action/actionType';

export default function metaData(state = initialState, action) {
    switch (action.type) {
        case ADD_EDGE:
            return { ...state, edges: [...state.edges, action.edge] };
        case ADD_VERTEX:
            return { ...state, vertices: [...state.vertices, action.vertices]  };
        case UPDATE_EDGE:
            return { ...state,  edges: action.edge  };
        case UPDATE_VERTEX:
            return { ...state,  vertices: action.vertices };
        case UPDATE_CURRENT_OPERATIONS:
            return { ...state,  activeOperations: action.operation };
        default:
            return state
    }
}