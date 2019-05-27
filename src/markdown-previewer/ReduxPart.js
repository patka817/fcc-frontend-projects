import { createStore } from 'redux';
import markdown from './DefaultMarkdown';

// ACTIONS 
const UPDATE_MARKDOWN = 'update';
const UPDATE_EDITORSCREEN = 'fullscreen-editor';
const UPDATE_PREVIEWSCREEN = 'fullscreen-preview';

export const updateMarkdown = (markdown) => {
    return {
        type: UPDATE_MARKDOWN,
        markdown: markdown
    }
};

export const updateEditorScreen = () => {
    return {
        type: UPDATE_EDITORSCREEN
    }
};

export const updatePreviewScreen = () => {
    return {
        type: UPDATE_PREVIEWSCREEN
    }
};

// REDUCER

const rootReducer = (state, action) => {
    switch (action.type) {
        case UPDATE_MARKDOWN:
            return {
                ...state,
                rawMarkdown: action.markdown
            }
        case UPDATE_EDITORSCREEN:
            return {
                ...state,
                fullscreenEditor: !state.fullscreenEditor
            }
        case UPDATE_PREVIEWSCREEN:
            return {
                ...state,
                fullscreenPreview: !state.fullscreenPreview
            }
        default:
            return state;
    }
};

let defaultState = {
    rawMarkdown: markdown,
    fullscreenEditor: false,
    fullscreenPreview: false
}

export const store = createStore(rootReducer, defaultState);