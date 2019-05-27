import React from 'react';
import {withRouter} from 'react-router-dom';

const BackButton = (props) => {
    return (
        <button className='back-button' hidden={props.hidden} onClick={props.onClick}><i className="fas fa-arrow-left"></i></button>
    );
};

class NavBar extends React.Component {
    render() {
        return (
            <nav className='main-navbar'>
                <BackButton hidden={this.props.hideBackButton} onClick={this.props.history.goBack} />
                <h1>{this.props.title}</h1>
            </nav>
        );
    }
}

export default withRouter(NavBar);