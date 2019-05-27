import React from 'react';
import { connect } from 'react-redux';
import marked from 'marked';
import Navbar from './NavbarComponent';
import { updatePreviewScreen } from './ReduxPart';

marked.setOptions({
    breaks: true,
});

class PreviewPresentational extends React.Component {
    constructor(props) {
        super(props);
        this.toggleScreen = this.toggleScreen.bind(this);

        this.markedRenderer = new marked.Renderer();
        this.markedRenderer.link = function (href, title, text) {
            return `<a target="_blank" href="${href}">${text}</a>`;
        }
    }

    toggleScreen() {
        this.props.toggleFullscreen();
    }

    render() {
        let classes = this.props.fullscreen ? 'preview-container full-screen' : 'preview-container';
        console.log('PREVIEW MARKDOWN: ' + this.props.markdown);
        return (
            <div className={classes}>
                <Navbar title='Preview' toggleScreen={this.toggleScreen} />
                <div id='preview' dangerouslySetInnerHTML={{ __html: marked(this.props.markdown, { renderer: this.markedRenderer }) }}>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        markdown: state.rawMarkdown,
        fullscreen: state.fullscreenPreview,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleFullscreen: () => {
            dispatch(updatePreviewScreen());
        }
    }
};

const Preview = connect(mapStateToProps, mapDispatchToProps)(PreviewPresentational);

export default Preview;