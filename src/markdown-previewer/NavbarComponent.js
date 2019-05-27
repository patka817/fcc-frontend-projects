import React from 'react';

class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar">
                <div className="navbar-left">
                    <div><i className="fab fa-free-code-camp"></i></div>
                    <div><p>{this.props.title}</p></div>
                </div>
                <div className="navbar-right">
                    <button onClick={this.props.toggleScreen}><i className="fas fa-arrows-alt-h"></i></button>
                </div>
            </nav>
        );
    }
}

export default Navbar;