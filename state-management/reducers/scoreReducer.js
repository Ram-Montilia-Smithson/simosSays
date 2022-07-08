import { SET_TOP_SCORE } from '../actions/types';

const initialState = {
    placeName: '',
    places: [],
    topScore: 0
};

const scoreReducer = (state = initialState, action) => {
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
}

export default scoreReducer;