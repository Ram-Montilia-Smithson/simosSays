// replace createStore with configureStore method of the @reduxjs/toolkit
import { createStore, combineReducers } from 'redux';
import scoreReducer from './reducers/scoreReducer';

const rootReducer = combineReducers({
    scores: scoreReducer
});

const configureStore = () => {
    return createStore(rootReducer);
}

export default configureStore;