import React from 'react';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import posed, { PoseGroup } from 'react-pose';

import './App.css';
import './calculator/calculatorApp.js';
import CalculatorApp from './calculator/calculatorApp.js';
import DrumApp from './drum-machine/DrumApp.js';
import MarkdownApp from './markdown-previewer/MarkdownApp.js';
import QuoteApp from './quote-machine/QuoteApp.js';
import PomodoroApp from './pomodoro-timer/PomodoroApp.js';
import NavBar from './BackComponent';

const RoutesContainer = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
});

function App() {
  const supportsHistory = 'pushState' in window.history;
  return (
    <Router forceRefresh={!supportsHistory}>
      <PoseGroup>
      <RoutesContainer key={window.history.location}>
        <Switch>
          <Route exact path="/" component={MainApp} />
          <Route path="/calculator" component={CalculatorApp} />
          <Route path="/drum-machine" component={DrumApp} />
          <Route path="/markdown-editor" component={MarkdownApp} />
          <Route path="/quote-machine" component={QuoteApp} />
          <Route path="/pomodoro-timer" component={PomodoroApp} />
        </Switch>
      </RoutesContainer>
      </PoseGroup>
    </Router>
  );
}

class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deferredPrompt: null };

    this.beforeInstall = this.beforeInstall.bind(this);
    this.onInstall = this.onInstall.bind(this);
    this.postInstall = this.postInstall.bind(this);
  }

  beforeInstall(e) {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    console.log('Before install prompt!');
    this.setState({
      deferredPrompt: e
    });
  }

  onInstall() {
    console.log('clicked on install');
    if (!this.state.deferredPrompt) {
      return;
    }
    // Show the prompt
    let dp = this.state.deferredPrompt;
    dp.prompt();
    // Wait for the user to respond to the prompt
    dp.userChoice
      .then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        this.setState({ deferredPrompt: null });
      });
  }

  postInstall() {
    console.log('Post install');
    this.setState({ deferredPrompt: null });
  }

  componentDidMount() {
    window.addEventListener('beforeinstallprompt', this.beforeInstall);
    window.addEventListener('appinstalled', this.postInstall);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeinstallprompt', this);
    window.removeEventListener('appinstalled', this);
  }


  render() {
    const style = !this.state.deferredPrompt ? { display: 'none' } : { display: 'block' };
    console.log('Style.display: ' + style.display);
    return (
      <div className="MainApp">
        <NavBar title='Home' hideBackButton={true} />
        <ul className='projects-list'>
          <li><Link to="/calculator" className='card'>Calculator</Link></li>
          <li><Link to="/drum-machine" className='card'>DrumMachine</Link></li>
          <li><Link to="/markdown-editor" className='card'>Markdown Editor</Link></li>
          <li><Link to="/quote-machine" className='card'>Quote Machine</Link></li>
          <li><Link to="/pomodoro-timer" className='card'>Pomodoro Timer</Link></li>
        </ul>
        <button id='install-button' className='install-button' style={style} onClick={this.onInstall}>Install</button>
      </div>
    );
  }
}

export default App;
