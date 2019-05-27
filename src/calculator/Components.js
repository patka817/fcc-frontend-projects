import React from 'react';
import { connect } from 'react-redux';
import * as Store from './ReduxPart';

/* Const's */
const Operators = [
    { id: 'divide', title: '/' },
    { id: 'multiply', title: '*' },
    { id: 'subtract', title: '-' },
    { id: 'add', title: '+' }
];

const Numbers = [{ id: 'one', title: '1' },
{ id: 'two', title: '2' },
{ id: 'three', title: '3' },
{ id: 'four', title: '4' },
{ id: 'five', title: '5' },
{ id: 'six', title: '6' },
{ id: 'seven', title: '7' },
{ id: 'eight', title: '8' },
{ id: 'nine', title: '9' },
{ id: 'zero', title: '0' },
{ id: 'decimal', title: '.' }
];

/* Components */

const NumberButtons = (props) => {
    const onClick = (input) => {
        return () => { props.onClick(input) };
    };
    const jsxArray = Numbers.map(x => (<button id={x.id} key={x.id} className='calc-button number-button' style={{ gridArea: x.id }} onClick={onClick(x.title)}>{x.title}</button>));
    return (<>{jsxArray}</>);
};

const OperatorButtons = (props) => {
    const onClick = (input) => {
        return () => { props.onClick(input) };
    };
    const jsxArray = Operators.map(x => (<button id={x.id} key={x.id} className='calc-button operator-button' style={{ gridArea: x.id }} onClick={onClick(x.title)}>{x.title}</button>));
    return (<>{jsxArray}</>);
};

const AcButton = (props) => {
    return (<button id='clear' style={{ gridArea: 'ac' }} className='calc-button ac-button' onClick={props.onClick} >AC</button>);
};

const EqualsButton = (props) => {
    return (<button id='equals' style={{ gridArea: 'equals' }} className='calc-button equals-button' onClick={props.onClick}>=</button>);
};

const Display = (props) => {
    return (
        <div key={Math.random()} className='calc-display' style={{ gridArea: 'display' }}>
            <div className='expression-display'>
                {props.expression}
            </div>

            <div className='input-display'>
                {props.input}
            </div>
        </div>
    );
};

class CalculatorPresentational extends React.Component {
    render() {
        return (
            <>
                <div className='calculator-container'>
                    <Display expression={this.props.expression} input={this.props.input} />
                    <AcButton onClick={this.props.acCallback} />
                    <EqualsButton onClick={this.props.equalsCallback} />
                    <OperatorButtons onClick={this.props.operatorCallback} />
                    <NumberButtons onClick={this.props.numberCallback} />
                </div>
                <div className='created-by'>
                    <em>Created by Patrik Karlsson</em>
                </div>
            </>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        expression: state.expression,
        input: state.input
    };
};

const mapDispatchToCalcProps = (dispatch) => {
    return {
        acCallback: () => { dispatch(Store.clear()) },
        equalsCallback: () => { dispatch(Store.equals()) },
        numberCallback: (input) => { dispatch(Store.addNumber(input)) },
        operatorCallback: (input) => { dispatch(Store.addOperator(input)) },
    }
};

const Calculator = connect(mapStateToProps, mapDispatchToCalcProps)(CalculatorPresentational);

export default Calculator;
