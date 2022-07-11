import { createSlice } from '@reduxjs/toolkit'

const SET_TOP_SCORE = 'scores/setTopScore';
const SET_TOP_10_SCORES = 'scores/setTop10Scores';


const initialState = {
    top10Scores: [],
    topScore: 0,
};

const scoreSlice = createSlice({
    name: 'scores',
    initialState,
    reducers: {
        setTopScore(state, action) {
            switch (action.type) {
                case SET_TOP_SCORE:
                    if (action.payload > state.topScore) {
                        return {
                            ...state,
                            topScore: action.payload
                        }
                    }
                default:
                    return state;
            }
        },
        setTop10Scores(state, action) {
            switch (action.type) {
                case SET_TOP_10_SCORES:
                    state.top10Scores.push(action.payload);
                    state.top10Scores.sort((a, b) => b.score - a.score);
                    if (state.top10Scores.length > 10) state.top10Scores.length = 10
                default:
                    return state;
            }
        }
    }
})

export const selectTopScore = (state) => state.score.topScore
export const selectTop10Scores = (state) => state.score.top10Scores

export const { setTopScore, setTop10Scores } = scoreSlice.actions

export default scoreSlice.reducer