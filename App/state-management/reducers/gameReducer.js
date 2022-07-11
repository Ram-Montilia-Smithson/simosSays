import { createSlice } from '@reduxjs/toolkit'

const INITIALIZE_PLAY = 'game/initializePlay'
const SET_TOP_SCORE = 'game/setIsOn';
const SET_IS_DISPLAY = 'game/setIsDisplay';
const SET_COLORS = 'game/setColors';
const SET_FLASH_COLOR = 'game/setFlashColor';
const SET_SCORE = 'game/setScore';
const SET_USER_PLAY = 'game/setUserPlay';
const SET_USER_COLORS = 'game/setUserColors';

const initialState = {
    isOn: false,
    isDisplay: false,
    colors: [],
    score: 0,
    userPlay: false,
    userColors: [],
    flashColor: ''
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        initializePlay(state, action) {
            switch (action.type) {
                case INITIALIZE_PLAY:
                    return initialState;
                default:
                    return state;
            }
        },
        setIsOn(state, action) {
            switch (action.type) {
                case SET_TOP_SCORE:
                    return {
                        ...state,
                        isOn: action.payload
                    };
                default:
                    return state;
            };
        },
        setIsDisplay(state, action) {
            switch (action.type) {
                case SET_IS_DISPLAY:
                    return {
                        ...state,
                        isDisplay: action.payload
                    };
                default:
                    return state;
            };
        },
        setColors(state, action) {
            switch (action.type) {
                case SET_COLORS:
                    return {
                        ...state,
                        colors: action.payload
                    };
                default:
                    return state;
            };
        },
        setFlashColor(state, action) {
            switch (action.type) {
                case SET_FLASH_COLOR:
                    return {
                        ...state,
                        flashColor: action.payload
                    };
                default:
                    return state;
            }
        },
        setScore(state, action) {
            switch (action.type) {
                case SET_SCORE:
                    return {
                        ...state,
                        score: action.payload
                    };
                default:
                    return state;
            };
        },
        setUserPlay(state, action) {
            switch (action.type) {
                case SET_USER_PLAY:
                    return {
                        ...state,
                        userPlay: action.payload
                    };
                default:
                    return state;
            };
        },
        setUserColors(state, action) {
            switch (action.type) {
                case SET_USER_COLORS:
                    return {
                        ...state,
                        userColors: action.payload
                    };
                default:
                    return state;
            };
        },
    }
})

export const selectPlay = (state) => state.game;
export const selectIsOn = (state) => state.game.isOn;
export const selectIsDisplay = (state) => state.game.isDisplay;
export const selectColors = (state) => state.game.colors;
export const selectFlashColor = (state) => state.game.flashColor;
export const selectScore = (state) => state.game.score;
export const selectUserPlay = (state) => state.game.userPlay;
export const selectUserColors = (state) => state.game.userColors;

export const {
    initializePlay,
    setIsOn,
    setIsDisplay,
    setColors,
    setScore,
    setFlashColor,
    setUserPlay,
    setUserColors
} = gameSlice.actions;

export default gameSlice.reducer;