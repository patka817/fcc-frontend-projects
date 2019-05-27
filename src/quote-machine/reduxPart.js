import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'

// ACTIONS

const NEW_QUOTE = 'NEW_QUOTE';
const FETCHING_QUOTE = 'FETCHING';

const fetchingQuote = () => {
    return {
        type: FETCHING_QUOTE
    };
};

const doneFetchingQuote = (quote, author, success) => {
    return {
        type: NEW_QUOTE,
        quote: quote,
        author: author
    };
}

export const newQuote = () => {
    return (dispatch) => {
        dispatch(fetchingQuote());

        fetch('https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1', {
            method: "GET",
            cache: 'no-cache'
        })
            .then(res => res.json())
            .then((out) => {
                let quote = out[0].content;
                dispatch(doneFetchingQuote(quote, out[0].title, false));
            })
            .catch(err => {
                dispatch(doneFetchingQuote('null', 'null', false));
            });
    };
};

// REDUCERS

const quoteReducer = (state = { author: null, quote: null }, action) => {
    switch (action.type) {
        case FETCHING_QUOTE:
            return {
                ...state,
                loadingQuote: true
            }
        case NEW_QUOTE:
            return {
                ...state,
                quote: action.quote,
                author: action.author,
                loadingQuote: false,
                color: 'darkgreen' // TODO randomize?
            };
        default:
            return state
    };
};

// REDUX

export const store = createStore(
    quoteReducer,
    {
        quote: 'Something new is not always new',
        author: 'Me',
        color: 'darkgreen',
        loadingQuote: false
    },
    applyMiddleware(ReduxThunk)
);

export default newQuote;
