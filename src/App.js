import React from 'react';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import './App.css';
import './calculator/calculatorApp.js';
import CalculatorApp from './calculator/calculatorApp.js';
import DrumApp from './drum-machine/DrumApp.js';
import MarkdownApp from './markdown-previewer/MarkdownApp.js';
import QuoteApp from './quote-machine/QuoteApp.js';
import PomodoroApp from './pomodoro-timer/PomodoroApp.js';
import NavBar from './BackComponent';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={MainApp} />
          <Route path="/calculator" component={CalculatorApp} />
          <Route path="/drum-machine" component={DrumApp} />
          <Route path="/markdown-editor" component={MarkdownApp} />
          <Route path="/quote-machine" component={QuoteApp} />
          <Route path="/pomodoro-timer" component={PomodoroApp} />
        </Switch>
    </Router>
  );
}

function MainApp() {
  return (
    <div className="MainApp">
      <NavBar title='Home' hideBackButton='true'/>
      <ul className='projects-list'>
      <Link to="/calculator"><li className='card'>Calculator</li></Link>
      <Link to="/drum-machine"><li className='card'>DrumMachine</li></Link>
      <Link to="/markdown-editor"><li className='card'>Markdown Editor</li></Link>
      <Link to="/quote-machine"><li className='card'>Quote Machine</li></Link>
      <Link to="/pomodoro-timer"><li className='card'>Pomodoro Timer</li></Link>
      </ul>
    </div>
  );
}

export default App;
