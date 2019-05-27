import React from 'react';
import './calculator.css'
import Calculator from './Components';
import { Provider } from 'react-redux';
import { store } from './ReduxPart';
import NavBar from '../BackComponent.jsx';

function CalculatorApp() {
  return (
    <Provider store={store}>
      <NavBar title='Calculator'/>
      <div className="CalculatorApp">
        <Calculator />
      </div>
    </Provider>
  );
}

export default CalculatorApp;