import { ADD_EDGE, ADD_VERTEX, UPDATE_EDGE, UPDATE_VERTEX, UPDATE_CURRENT_OPERATIONS } from './actionType';


export function addEdge(edge) {
        return { type: ADD_EDGE, edge };
}
export function addVertex(vertices) {
        return { type: ADD_VERTEX, vertices };
}
export function updataEdge(edge) {
        return { type: UPDATE_EDGE, edge };
}
export function updataVertex(vertices) {
        return { type: UPDATE_VERTEX, vertices };
}
export function updateCurrentOperations(operation) {
        return { type: UPDATE_CURRENT_OPERATIONS, operation };
}