import React from 'react';
import './QuoteApp.css';
import { newQuote, store } from './reduxPart.js';
import { connect, Provider } from 'react-redux';
import NavBar from '../BackComponent';

class AppPresentational extends React.Component {
  render() {
    return (
      <div className="QuoteApp" style={{ backgroundColor: this.props.color }}>
        <QuoteBoxContainer color={this.props.color} />
      </div>
    );
  }
}

// Connecting App

const mapStateToAppProps = (state) => {
  return {
    color: state.color
  }
}

const App = connect(mapStateToAppProps, null)(AppPresentational);

const QuoteApp = () => {
  return (
    <Provider store={store}>
      <NavBar title='Quote Machine'/>
      <App />
    </Provider>
  );
}

// QuoteBox

class QuoteBox extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.props.requestNewQuote();
  }

  render() {
    const quote = this.props.quote;
    return (
      <div id="quote-box" className="quote-box" style={{ color: this.props.color }}>
        <section id="text">
          <i className="fas fa-quote-right fa-fw"></i>
          <div dangerouslySetInnerHTML={{ __html: quote }}>
          </div>
        </section>

        <section id="author">
          <p>- {this.props.author}</p>
        </section>

        <section className="buttons-row">
          <section className="icons">
            <a style={{ backgroundColor: this.props.color }} href={'https://twitter.com/intent/tweet?text=' + quote} id="tweet-quote" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
          </section>
          <section key="button-section" className="quote-button-container">
            <SpinnerButton color={this.props.color} onClick={this.handleClick} text="New Quote" loading={this.props.loading} />
          </section>

        </section>
      </div>
    );
  }
}

class SpinnerButton extends React.Component {
  render() {
    const icon = this.props.loading ? <div><i className="fas fa-spinner fa-spin"></i></div> : null;
    const text = this.props.loading ? null : this.props.text;
    return <button id="new-quote" style={{ backgroundColor: this.props.color }} onClick={this.props.onClick} disabled={this.props.loading}>{text}{icon}</button>
  }
}

// Connecting QuoteBox

const mapStateToQuoteProps = (state) => {
  return {
    quote: state.quote,
    author: state.author,
    loading: state.loadingQuote
  };
}

const mapDispatchToQuoteProps = (dispatch) => {
  return {
    requestNewQuote: () => {
      console.log('Requesting new quote');
      dispatch(newQuote());
    }
  };
}

const QuoteBoxContainer = connect(mapStateToQuoteProps, mapDispatchToQuoteProps)(QuoteBox);

export default QuoteApp;
