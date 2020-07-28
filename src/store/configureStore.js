import rootReducer from './reducer/metaData';
import { createStore } from 'redux';

const saveToLocalStorage = state => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        console.log('error to access local storage');
    }
}

const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null || serializedState === undefined)
            return undefined;
        return JSON.parse(serializedState);
    } catch (error) {
        return undefined;
    }
}

const initialState = loadFromLocalStorage();

const store = createStore(
    rootReducer,
    // initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;