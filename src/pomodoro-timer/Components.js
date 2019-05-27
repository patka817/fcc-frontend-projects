import React from 'react';
import { connect } from 'react-redux';
import * as Store from './ReduxPart';

/* SETTINGS */

const UpDownSetting = (props) => {
    const upClick = () => {
        props.onChange(1);
    }
    const downClick = () => {
        props.onChange(-1);
    }

    return (
        <div className='setting-container'>
            <div id={props.id + '-label'} className='settings-label' >{props.title}</div>
            <div className='pomodoro-button-row'>
                <button id={props.id + '-decrement'} className='pomodoro-button' onClick={downClick}><i className="fas fa-arrow-down"></i></button>
                <div id={props.id + '-length'} className='settings-value'>{props.value}</div>
                <button id={props.id + '-increment'} className='pomodoro-button' onClick={upClick}><i className="fas fa-arrow-up"></i></button>
            </div>
        </div>
    );
};

class SettingsPresentational extends React.Component {
    render() {
        return (
            <div className='settings'>
                <UpDownSetting id='break' title='Break length' value={this.props.breakLength} onChange={this.props.breakLengthCallback} />
                <UpDownSetting id='session' title='Session length' value={this.props.sessionLength} onChange={this.props.sessionLengthCallback} />
            </div>
        );
    }
}

const mapStateToSettingsProp = (state) => {
    return {
        breakLength: state.settings.breakLength,
        sessionLength: state.settings.sessionLength,
    };
};

const mapDispatchToSettingsProp = dispatch => {
    return {
        breakLengthCallback: (value) => { dispatch(Store.changeBreaklength(value)) },
        sessionLengthCallback: (value) => { dispatch(Store.changeSessionLength(value)) }
    };
};

export const Settings = connect(mapStateToSettingsProp, mapDispatchToSettingsProp)(SettingsPresentational);

/* CONTROL */

const ControlButton = props => {
    return (
        <button id={props.id} key={Math.random()} className='pomodoro-button control-button' onClick={props.onClick}><i className={props.iconClasses}></i></button>
    );
};

class ControlButtonsPresentational extends React.Component {
    constructor(props) {
        super(props);
        this.startPause = this.startPause.bind(this);
        this.reset = this.reset.bind(this);
    }

    // 'Hack' to fix FCC tests, they require a start-stop button but I have made seperate buttons for start/stop...
    startPause() {
        console.log('Start-pause');
        if (this.props.started) {
            this.props.pause()
        } else {
            this.props.start();
        }
    }

    reset() {
        document.getElementById('beep').pause();
        document.getElementById('beep').currentTime = 0;
        this.props.reset();
    }

    render() {
        const pauseClasses = this.props.paused ? 'blue-color' : '';
        const playClasses = this.props.started && !this.props.paused ? 'blue-color' : '';

        return (
            <div className='control-buttons'>
                <ControlButton onClick={this.props.start} iconClasses={'far fa-play-circle ' + playClasses} />
                <ControlButton onClick={this.props.pause} iconClasses={'far fa-pause-circle ' + pauseClasses} />
                <ControlButton id='reset' onClick={this.reset} iconClasses='fas fa-undo' />
                { /* 'Hack' to fix FCC tests, they require a start-stop button but I have made seperate buttons for start/stop... */}
                <button id="start_stop" className='pomodoro-button' onClick={this.startPause} style={{ position: 'absolute', top: '-100px', right: '-100px' }}>Start-stop</button>
            </div>
        );
    }
}

const mapDispatchToControl = dispatch => {
    return {
        start: () => { dispatch(Store.start()) },
        reset: () => { dispatch(Store.reset()) },
        pause: () => { dispatch(Store.pause()) }
    }
};

const mapStateToControlButtonsProps = state => {
    return {
        started: state.control.started,
        paused: state.control.paused
    };
};

export const ControlButtons = connect(mapStateToControlButtonsProps, mapDispatchToControl)(ControlButtonsPresentational);

/* TIMER */

const TIMERTYPE_SESSION = 'Session';
const TIMERTYPE_BREAK = 'Break';

const RED_TEXT_TIME_LIMIT_MS = 60 * 1000;

const defaultTimerState = {
    startDate: null,
    timeLeft: 0,
    totalCountdownTime: 0,
    timerClasses: '',
    timerType: TIMERTYPE_SESSION
};

class TimerPresentational extends React.Component {
    constructor(props) {
        super(props);

        this.state = defaultTimerState;
        this.intervalRef = null;

        this.pauseTimer = this.pauseTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.resumeTimer = this.resumeTimer.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.tick = this.tick.bind(this);
        this.timeLabelValue = this.timeLabelValue.bind(this);
        this.buzzer = this.buzzer.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.started && nextProps.started) {
            this.startTimer();
        } else if (this.props.started && !nextProps.started) {
            this.resetTimer();
        } else if (this.props.started && !this.props.paused && nextProps.paused) {
            this.pauseTimer();
        } else if (this.props.started && this.props.paused && nextProps.started && !nextProps.paused) {
            this.resumeTimer();
        }
    }

    startTimer(breakMode = false) {
        let timeLeft = breakMode ? this.props.breakLength : this.props.sessionLength;
        timeLeft *= (60 * 1000); // converting minutes to ms
        this.setState({
            ...this.state,
            startDate: Date.now(),
            timeLeft,
            totalCountdownTime: timeLeft,
            timerType: breakMode ? TIMERTYPE_BREAK : TIMERTYPE_SESSION,
            timerClasses: timeLeft < RED_TEXT_TIME_LIMIT_MS ? 'red-color' : '',
        }, () => {
            this.intervalRef = setInterval(this.tick, 300);
        });
    }

    pauseTimer() {
        console.log('pause timer');
        clearInterval(this.intervalRef);
        this.setState({
            ...this.state,
            totalCountdownTime: this.state.timeLeft // since we set a new date upon resume we must keep time left as the new totalCountDownTime
        });
    }

    resumeTimer() {
        console.log('resume timer');
        this.setState({
            ...this.state,
            startDate: Date.now()
        }, () => {
            this.intervalRef = setInterval(this.tick, 300);
        });
    }

    resetTimer() {
        // we should pause buzzer here..
        // FCC's test's won't allow it, I guess they don't handle async code (settings state through redux then react on it...)
        clearInterval(this.intervalRef);
        this.setState(defaultTimerState);
    }

    tick() {
        const diff = Date.now() - this.state.startDate;
        const timeLeft = this.state.totalCountdownTime - diff;

        this.setState({
            ...this.state,
            timerClasses: timeLeft < RED_TEXT_TIME_LIMIT_MS ? 'red-color' : '',
            timeLeft: timeLeft
        });

        // we should start buzzer here.. 

        if (timeLeft <= 0) {
            clearInterval(this.intervalRef);
            setTimeout(() => {
                this.startTimer(this.state.timerType === TIMERTYPE_SESSION);
            }, 1000);
        }
    }

    timeLabelValue(timeInMs) {
        const timeInSeconds = Math.round(timeInMs / 1000);
        let seconds = timeInSeconds % 60;
        let secPre = '';
        const minutes = Math.round((timeInSeconds - seconds) / 60);
        let minPre = '';
        if (seconds < 10) {
            secPre = '0';
        }
        if (minutes < 10) {
            minPre = '0';
        }
        return `${minPre}${minutes}:${secPre}${seconds}`;
    }

    buzzer(timeLabelValue) {
        const audio = document.getElementById('beep');
        if (timeLabelValue === '00:00' && audio.currentTime === 0 && this.props.started) {
            audio.play();
        }
    }

    render() {
        const timeValue = this.props.started ? this.timeLabelValue(this.state.timeLeft) : this.timeLabelValue(this.props.sessionLength * 60 * 1000);
        this.buzzer(timeValue);
        return (
            <>
                <div className={'timer ' + this.state.timerClasses}>
                    <div id='timer-label' className='timer-label'>{this.state.timerType}</div>
                    <div id='time-left' className='time-left'>{timeValue}</div>
                </div>
                <audio id='beep' src="https://goo.gl/65cBl1" preload='true'>

                </audio>
            </>
        );
    }
}

const mapStateToTimerProps = (state) => {
    return {
        paused: state.control.paused,
        started: state.control.started,
        sessionLength: state.settings.sessionLength,
        breakLength: state.settings.breakLength
    };
};

export const Timer = connect(mapStateToTimerProps, null)(TimerPresentational);