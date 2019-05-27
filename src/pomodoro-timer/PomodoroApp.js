import React from 'react';
import './PomodoroApp.css';
import { Settings, ControlButtons, Timer } from './Components';
import NavBar from '../BackComponent.jsx';
import { Provider } from 'react-redux';
import { store } from './ReduxPart';

function PomodoroApp() {
  return (
    <>
      <NavBar title='Pomodoro Timer' />
      <div className="PomodoroApp">
        <div className='pomodoro-content'>
          <header className='pomodoro-header'>
            Pomodoro Clock
      </header>
          <Provider store={store}>
            <Settings />
            <Timer />
            <ControlButtons />
          </Provider>

        </div>
      </div>
    </>
  );
}

export default PomodoroApp;
