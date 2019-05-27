import React from 'react';
import { Provider } from 'react-redux';
import Editor from './EditorComponent';
import Preview from './PreviewComponent';
import './MarkdownApp.css';
import { store } from './ReduxPart.js';

function MarkdownApp() {
  return (
    <Provider store={store}>
      <div className="MarkdownApp">
        <Editor />
        <Preview />
      </div>
    </Provider>
  );
}

export default MarkdownApp;
