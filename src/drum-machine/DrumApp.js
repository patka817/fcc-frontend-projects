import React from 'react';
import './DrumApp.css';
import DrumMachine from './DrumComponents.js';
import { Provider } from 'react-redux';
import store from './Store';
import NavBar from '../BackComponent.jsx';

function DrumApp() {
  return (
    <Provider store={store}>
      <NavBar title='Drum-machine' />
      <div className="DrumApp">
        <DrumMachine />
      </div>
    </Provider>
  );
}

export default DrumApp;
