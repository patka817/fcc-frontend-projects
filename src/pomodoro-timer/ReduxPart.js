import { createStore, combineReducers } from 'redux';

const CHANGE_BREAKLENGTH = 'breakLength';
const CHANGE_SESSIONLENGTH = 'sessionLength';

const SESSIONLENGTH_DEFAULT = 25;
const BREAKLENGTH_DEFAULT = 5;

export const changeBreaklength = (value) => {
    return {
        type: CHANGE_BREAKLENGTH,
        value: value
    };
}

export const changeSessionLength = (value) => {
    return {
        type: CHANGE_SESSIONLENGTH,
        value: value
    };
}

const settingsReducer = (state = { breakLength: BREAKLENGTH_DEFAULT, sessionLength: SESSIONLENGTH_DEFAULT }, action) => {
    console.log('state: ' + state);
    switch (action.type) {
        case CHANGE_BREAKLENGTH:
            return {
                ...state,
                breakLength: Math.max(Math.min(60, state.breakLength + action.value), 1)
            };

        case CHANGE_SESSIONLENGTH:
            return {
                ...state,
                sessionLength: Math.max(Math.min(60, state.sessionLength + action.value), 1)
            };

        case RESET:
            return {
                breakLength: BREAKLENGTH_DEFAULT,
                sessionLength: SESSIONLENGTH_DEFAULT
            }

        default:
            return state
    }
}

const START = 'start';
const PAUSE = 'pause';
const RESET = 'reset';

export const start = () => {
    return { type: START }
}

export const reset = () => {
    return { type: RESET }
}

export const pause = () => {
    return { type: PAUSE }
}

const controlReducer = (state = { started: false, paused: false }, action) => {
    switch (action.type) {
        case START:
            return {
                ...state,
                started: true,
                paused: false
            }

        case PAUSE:
            return {
                ...state,
                paused: state.started ? !state.paused : false
            };

        case RESET:
            return {
                ...state,
                started: false,
                paused: false
            };

        default:
            return state;
    }
};

const rootReducer = combineReducers({ settings: settingsReducer, control: controlReducer })

export const store = createStore(rootReducer);
export default store;