import { configureStore } from '@reduxjs/toolkit'
import scoreReducer from './reducers/scoreReducer';
import gameReducer from './reducers/gameReducer';

export const store = configureStore({
    reducer: {
        score: scoreReducer,
        game: gameReducer,
    },
});