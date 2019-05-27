import React from 'react';
import { connect } from 'react-redux';
import { powerAction, tappedPadAction, volDownAction, volOffAction, volUpAction } from './Store';

/* DRUMPAD */

const SOUND_MAP = {
    'Q': 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
    'W': 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
    'E': 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
    'A': 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
    'S': 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
    'D': 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
    'Z': 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
    'X': 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
    'C': 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
};

const DrumPadStyle = {
    activeStyle: {
        backgroundColor: 'orange',
        boxShadow: "0 3px orange",
    },
    inactiveStyle: {

    }
};

class DrumPadPresentational extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            style: DrumPadStyle.inactiveStyle
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleKeyUpEvent = this.handleKeyUpEvent.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keyup', this.handleKeyUpEvent);
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.handleKeyUpEvent);
    }

    handleKeyUpEvent(event) {
        if (event.key.toUpperCase() === this.props.id && this.props.powerOn) {
            this.handleClick();
        }
    }

    activatePad() {
        if (this.props.powerOn) {
            if (this.state.style === DrumPadStyle.activeStyle) {
                this.setState({ style: DrumPadStyle.inactiveStyle });
            } else {
                this.setState({ style: DrumPadStyle.activeStyle });
            }
        }
    }

    handleClick() {
        const sound = document.getElementById(this.props.id);
        sound.volume = this.props.volume;
        sound.currentTime = 0;
        sound.play().then(() => { console.log('Done playing') });
        this.activatePad();
        setTimeout(() => this.activatePad(), 100);
        this.props.tappedDrumPad(this.props.id)
    }

    render() {
        return (
            <button style={this.state.style} id={'audio-' + this.props.id} className="drum-button drum-pad" onClick={this.handleClick} disabled={!this.props.powerOn}>
                <audio id={this.props.id} className='clip' src={SOUND_MAP[this.props.id]}>
                </audio>
                {this.props.id}
            </button>
        );
    }
}

const mapStateToDrumPadProps = (state) => {
    return {
        powerOn: state.powerOn,
        volume: state.volume_off ? 0.0 : state.volume
    };
};

const mapDispatchToDrumPadProps = (dispath) => {
    return {
        tappedDrumPad: (drumPadId) => {
            dispath(tappedPadAction(drumPadId));
        }
    };
};

const DrumPad = connect(mapStateToDrumPadProps, mapDispatchToDrumPadProps)(DrumPadPresentational);

/* POWER BUTTON */

class PowerButtonPresentational extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.powerButtonTapped()
    }

    render() {
        const buttonIconClasses = this.props.powerOn ? "fas fa-power-off power-on" : "fas fa-power-off power-off";
        return (
            <button key={Math.random()} className="drum-button power-button" onClick={this.handleClick}><i className={buttonIconClasses}></i></button>
        );
    }
}

const mapStateToPowerButtonProps = (state) => {
    return { powerOn: state.powerOn };
};

const mapDispatchToPowerButtonProps = (dispatch) => {
    return { powerButtonTapped: () => { dispatch(powerAction()) } }
};

const PowerButton = connect(mapStateToPowerButtonProps, mapDispatchToPowerButtonProps)(PowerButtonPresentational);

/* VOLUME */

class VolumeControlPresentational extends React.Component {
    constructor(props) {
        super(props);

        this.handleDownClick = this.handleDownClick.bind(this);
        this.handleOffClick = this.handleOffClick.bind(this);
        this.handleUpClick = this.handleUpClick.bind(this);
    }

    handleOffClick() {
        this.props.dispatch(volOffAction());
    }

    handleDownClick() {
        this.props.dispatch(volDownAction());
    }

    handleUpClick() {
        this.props.dispatch(volUpAction());
    }

    render() {
        const volOffIconClasses = this.props.volumeOff ? 'fas fa-volume-off highlight-icon' : 'fas fa-volume-off';
        return (
            <div className="volume-control">
                <div className='volume-display'>Volume: {this.props.volumeString}</div>
                <button key={Math.random()} className="drum-button volume-button" style={{ gridArea: 'btn1' }} onClick={this.handleOffClick}><i className={volOffIconClasses}></i></button>
                <button disabled={this.props.volumeOff} className="drum-button volume-button" style={{ gridArea: 'btn2' }} onClick={this.handleDownClick}><i className="fas fa-volume-down"></i></button>
                <button disabled={this.props.volumeOff} className="drum-button volume-button" style={{ gridArea: 'btn3' }} onClick={this.handleUpClick}><i className="fas fa-volume-up"></i></button>
            </div>
        );
    }
}

const mapStateToVolumeControlProps = (state) => {
    return {
        volume: state.volume,
        volumeString: state.volume_off ? 'Off' : (Math.round(state.volume * 100)).toString() + '%',
        volumeOff: state.volume_off
    }
};

const mapDispatchToVolumeControlProps = (dispatch) => {
    return {
        dispatch: dispatch
    }
};

const VolumeControl = connect(mapStateToVolumeControlProps, mapDispatchToVolumeControlProps)(VolumeControlPresentational);

/* MISC */

const Display = (displayString) => {
    return <div id="drum-display">{displayString}</div>
};

const Header = () => {
    return (
        <div className="drum-machine-header">
            <p><em>Drummer </em><i className="fas fa-drum"></i></p>
        </div>
    );
}

const DrumPadContainer = () => {
    return (
        <div className="drumPadContainer">
            <DrumPad id="Q" /> <DrumPad id="W" /> <DrumPad id="E" />
            <DrumPad id="A" /> <DrumPad id="S" /> <DrumPad id="D" />
            <DrumPad id="Z" /> <DrumPad id="X" /> <DrumPad id="C" />
        </div>
    );
};

/* DrumMachine -  MAIN COMPONENT */

class DrumMachinePresentational extends React.Component {
    render() {
        return (
            <div id="drum-machine">
                <Header />
                <DrumPadContainer />
                {Display(this.props.displayString)}
                <VolumeControl />
                <PowerButton />
            </div>
        );
    }
}

const mapStateToDrumMachineProps = (state) => {
    return {
        displayString: state.displayString
    }
};

const DrumMachine = connect(mapStateToDrumMachineProps, null)(DrumMachinePresentational);

export default DrumMachine;