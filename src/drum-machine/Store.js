import { createStore } from 'redux';

const TAPPED_PAD = 'tappedPad';
const POWER_ONOFF = 'powerOn';
const VOL_UP = 'volume_up';
const VOL_DOWN = 'volume_down';
const VOL_OFF = 'volume_off';

export const volDownAction = () => {
    return { type: VOL_DOWN }
}

export const volUpAction = () => {
    return { type: VOL_UP }
}

export const volOffAction = () => {
    return { type: VOL_OFF }
}

export const powerAction = () => {
    return { type: POWER_ONOFF }
}

export const tappedPadAction = (padId) => {
    return { type: TAPPED_PAD, tappedPad: padId };
}

const rootReducer = (state, action) => {
    console.log('Reducing: ' + action.type);
    console.log('Action: ' + action);
    switch (action.type) {
        case POWER_ONOFF:
            return {
                ...state,
                powerOn: !state.powerOn,
                displayString: ''
            };

        case TAPPED_PAD:
            return {
                ...state,
                lastTappedPad: action.tappedPad,
                displayString: action.tappedPad
            };

        case VOL_UP:
            return {
                ...state,
                volume: Math.min(1.0, state.volume + 0.1)
            }

        case VOL_DOWN:
            return {
                ...state,
                volume: Math.max(0.0, state.volume - 0.1)
            }

        case VOL_OFF:
            return {
                ...state,
                volume_off: !state.volume_off
            }

        default:
            return state;
    }
};

const store = createStore(rootReducer, { powerOn: true, lastTappedPad: null, displayString: '', volume: 0.3, volume_off: false });
export default store;