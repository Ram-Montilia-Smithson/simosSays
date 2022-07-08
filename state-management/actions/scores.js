import { ADD_PLACE, SET_TOP_SCORE } from "./types";

export const addPlace = placeName => {
    return {
        type: ADD_PLACE,
        payload: placeName
    }
}

export const setTopScore = newScore => {
    return {
        type: SET_TOP_SCORE,
        payload: newScore
    }
}