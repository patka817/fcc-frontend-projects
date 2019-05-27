import { createStore } from 'redux';
import math from 'mathjs';

const ADD_NUMBER = 'addInputNumber'; // used by '.' as well
const ADD_OPERATOR = 'addInputOperator';
const EQUALS = 'equals';
const CLEAR = 'clear';

export const addNumber = (input) => {
    return {
        type: ADD_NUMBER,
        input: input
    };
};

export const addOperator = (input) => {
    return {
        type: ADD_OPERATOR,
        input: input
    };
};

export const clear = () => {
    return {
        type: CLEAR
    };
};

export const equals = () => {
    return {
        type: EQUALS
    };
};

const trimLastCharRegex = /[-+*/.]$/;
const lastCharIsDigitRegex = /[0-9]$/;

const rootReducer = (state, action) => {
    switch (action.type) {
        case ADD_NUMBER:
            if (action.input === '0' && state.input === '0') {
                return state;
            }
            if (action.input === '.' && state.input.indexOf('.') !== -1) {
                return state;
            }
            const resolveInput = (input) => {
                if (state.lastAction === ADD_NUMBER) {
                    return state.input + input;
                } else if (action.input === '.' && state.input.match(lastCharIsDigitRegex) === null) {
                    return '0.';
                }
                return input;
            };
            const expressionAddon = action.input === '.' && state.input.match(lastCharIsDigitRegex) === null ? '0.' : action.input;
            let newExpression = state.lastAction === EQUALS ? expressionAddon : state.expression + expressionAddon;
            return {
                expression: newExpression,
                input: resolveInput(action.input),
                lastAction: ADD_NUMBER
            };

        case ADD_OPERATOR:
            
            if (state.lastAction === ADD_OPERATOR) {
                let newExpr = state.expression.replace(trimLastCharRegex, action.input);
                return {
                    ...state,
                    expression: newExpr,
                    input: action.input,
                    lastAction: ADD_OPERATOR
                };
            }

            const newExpr = [EQUALS, CLEAR, null].indexOf(state.lastAction) !== -1 ? state.input + action.input : state.expression + action.input;
            return {
                ...state,
                expression: newExpr,
                input: action.input,
                lastAction: ADD_OPERATOR
            };

        case EQUALS:
            if (state.lastAction === EQUALS) {
                return state;
            }

            const trimmedExpression = state.expression.replace(trimLastCharRegex, '');
            const result = math.eval(trimmedExpression);
            return {
                ...state,
                expression: trimmedExpression + '=' + result,
                input: result,
                lastAction: EQUALS
            };

        case CLEAR:
            return {
                ...state,
                expression: '',
                input: '0',
                lastAction: CLEAR
            };
        default:
            return state;
    }
};

export const store = createStore(rootReducer, { expression: '', input: '0', lastAction: null });