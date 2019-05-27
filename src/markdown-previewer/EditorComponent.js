import React from 'react';
import { connect } from 'react-redux';
import Navbar from './NavbarComponent';
import { updateEditorScreen, updateMarkdown } from './ReduxPart'

class EditorPresentational extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.toggleScreen = this.toggleScreen.bind(this);
    }

    handleChange(event) {
        const value = event.target.value;
        console.log(value);
        this.props.updateMarkdown(value);
    }

    toggleScreen() {
        this.props.toggleFullscreen();
    }

    render() {
        let classes = this.props.fullscreen ? "editor-container full-screen" : "editor-container";
        if (this.props.hidden) {
            classes = classes.concat(' hidden');
        }
        
        return (
            <div className={classes} style={this.props.style}>
            <Navbar title='Editor' toggleScreen={this.toggleScreen} />
            <textarea type="text" id="editor" value={this.props.rawMarkdown} onChange={this.handleChange}></textarea>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        rawMarkdown: state.rawMarkdown,
        fullscreen: state.fullscreenEditor,
        hidden: state.fullscreenPreview
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleFullscreen: () => {
            dispatch(updateEditorScreen());
        },
        updateMarkdown: (markdown) => {
            dispatch(updateMarkdown(markdown));
        }
    }
};

const Editor = connect(mapStateToProps, mapDispatchToProps)(EditorPresentational);

export default Editor;