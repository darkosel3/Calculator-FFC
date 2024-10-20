import { useReducer, useState } from 'react';
import mathItUp from './libs/mathItUp';
import {Parser} from 'expr-eval'
import './App.css';
const parser = new Parser();

export const ACTIONS = {
    AC:"ac",
    EQUAL:"=",
    ADD_NUMBER:"add_number",
    MATH:"math",
    MINUS:'minus',
    PLUS:'plus'
}


function reducer(state,action){
    let lastDigit = state.currentOperand[state.currentOperand.length-1];
    let result = {
      ...state
    }
    let lastDigitPrev = result.previousOperand.slice(-1)
    let lastTwoCharPrev = result.previousOperand.slice(-2);
    switch(action.type){
      case ACTIONS.AC:
        result.previousOperand = ''
        result.currentOperand = '0';
        return result;
      case ACTIONS.ADD_NUMBER:
        return{
          ...state,
          currentOperand: state.currentOperand + action.payload,
          previousOperand: state.previousOperand + action.payload
      }
      case ACTIONS.MATH:
          if(typeof parseInt(result.currentOperand.slice(-1)) == 'number' && !isNaN(parseInt(result.previousOperand.slice(-1)))){
            // ukoliko je trenutni karakter broj i ukoliko je prethodni poslednji karakter nije broj
            result.currentOperand = action.payload
            result.previousOperand += action.payload
            return result
          }
          if(lastTwoCharPrev == '--' || lastTwoCharPrev == '++' || lastTwoCharPrev == '*-'|| lastTwoCharPrev =='+-' || lastTwoCharPrev == '/-'){
            // ukoliko su u trenutnomOperatoru poslednja dva karaktera minusi
            result.previousOperand = state.previousOperand.slice(0, -2) + action.payload;
            result.currentOperand = action.payload
            return result
          }else{
          if(lastDigit == '/' || lastDigit == '*' || lastDigit == '+' || lastDigit == '-'){
          result.previousOperand = state.previousOperand.slice(0, -1) + action.payload;
          result.currentOperand = action.payload
          return result
          }else{
            result.previousOperand += action.payload
            result.currentOperand += action.payload
            return result  
          }}
      
      case ACTIONS.MINUS:
        if(lastTwoCharPrev == '--' || lastTwoCharPrev == '*-'|| lastTwoCharPrev == '+-'|| lastTwoCharPrev == '/-'){ // kada su na kraju proslog dva minusa vrati stanje
          return result
        }
         else{
          result.previousOperand += '-'
          result.currentOperand = '-'
          return result
        }
      case ACTIONS.DOT:
        if(result.currentOperand.includes('.')){
          return result
        }

        if(!lastDigit || isNaN(parseInt(lastDigit))){
          result.previousOperand += '0.'
          result.currentOperand += '0.'
          return result
        }else{
          result.previousOperand += '.'
          result.currentOperand += '.'
          return result
        }
      case ACTIONS.EQUAL:
        result.currentOperand = parser.parse(result.previousOperand).evaluate().toString();
        result.previousOperand = parser.parse(result.previousOperand).evaluate().toString();
        return result

      
      default:
        return state;
        
    
}}

const initialState = {
  currentOperand: '',
  previousOperand: '',
  operator:''
};


function App() {
  const [{currentOperand,previousOperand},dispatch]=useReducer(reducer,
    initialState);
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-200">
      <h1 className='mb-10 font-bold text-3xl'>FreeCodeCamp Calculator using React</h1>
       <div className='calculator bg-black text-2xl'>
      <div id="display"className='flex flex-col border text-white'>
      <div id="previous" className=' bg-orange-600 text-right pr-2 pt-1 h-10'>{previousOperand}</div>
      <div id="current" className='text-right pr-2 pt-1 h-10 bg-black'>{currentOperand}</div>

      </div>
  <div className='numAndActions grid grid-cols-4 border border-white'>
    <button id="clear" className='col-span-2' onClick={() => dispatch({ type: ACTIONS.AC })}>AC</button>
    <button id="divide" onClick={() => dispatch({ type: ACTIONS.MATH, payload: '/' })}>/</button>
    <button id="multiply" onClick={() => dispatch({ type: ACTIONS.MATH, payload: '*' })}>*</button>
    <button id="seven" onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: '7' })}>7</button>
    <button id="eight" onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: '8' })}>8</button>
    <button id="nine" onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: '9' })}>9</button>
    <button id="subtract" onClick={() => dispatch({ type: ACTIONS.MINUS, payload: '-' })}>-</button>
    <button id="four" onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: '4' })}>4</button>
    <button id="five" onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: '5' })}>5</button>
    <button id="six" onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: '6' })}>6</button>
    <button id="add" onClick={() => dispatch({ type: ACTIONS.MATH, payload: '+' })}>+</button>
    <button id="one" onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: '1' })}>1</button>
    <button id="two" onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: '2' })}>2</button>
    <button id="three" onClick={() => dispatch({ type: ACTIONS.ADD_NUMBER, payload: '3' })}>3</button>
    <button id="equals" onClick={() => dispatch({ type: ACTIONS.EQUAL })} className='row-span-2'>=</button>    
    <button id="zero" onClick={() => dispatch({ type: ACTIONS.ZERO, payload: '0' })} className='col-span-2'>0</button>
    <button id="decimal" onClick={() => dispatch({ type: ACTIONS.DOT, payload: '.' })}>.</button>
  </div>

    </div>
    </div>
  );
}

export default App;






  