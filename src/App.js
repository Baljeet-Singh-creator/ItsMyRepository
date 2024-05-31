import React,{useState} from 'react'

import Header from './Components/Header';
import Keypad from './Components/Keypad';


import './Assets/App.css';


function App() {
  const usedKeycodes=[48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
    104, 105, 8, 13, 127, 187, 189, 191, 56, 111, 106, 107, 109,]

  const number=["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

  const operators=["-", "+", "*", "/"]

  

  const calculateResult=(exp)=>{
    if(!exp)return
    const lastchar=exp.slice(-1);
    if(operators.includes(lastchar)) exp=exp.slice(0,-1);
    
    const math = require('mathjs');
    const answer = math.evaluate(exp).toFixed(2);
    setResult(answer);
  }

  const[history,setHistory]=useState([])
  const[expression,setExpression]=useState('')
  const[result,setResult]=useState('')
  const handleKeyPress=(keycode, key)=>{
    if(!keycode)return
    if(!usedKeycodes.includes(keycode)){return}
    if(number.includes(key)){
      if(key==="0"){
        if(expression.length===0)return
      }
      calculateResult(expression+key)
      setExpression(expression+key)
    }
    else if(operators.includes(key)){
      if(!expression)return
      const lastchar=expression.slice(-1);
      if(operators.includes(lastchar)){return}
      if(lastchar==='.')return
      setExpression(expression+key)
    }
    else if(keycode===8){
      if(!expression){return};
      calculateResult(expression.slice(0,-1));
      setExpression(expression.slice(0,-1));

    }else if(key==="AC"){
      if(!expression){return};
     setExpression("") 
     setResult("0")
    }
    else if(keycode===13){
      if(!expression){return};
      calculateResult(expression)
      let temphistory=[...history];
      if(temphistory.length>20)temphistory=temphistory.splice(0,1);
      temphistory.push(expression)
      setHistory(temphistory)
    }

  };
  return (
    <>
    <div className="app"
       tabIndex='0'
       onKeyDown={(event)=>{handleKeyPress(event.keyCode,event.key)}}>
      <div className="app_calculator">
        <Header expression={expression} result={result} history={history}/>
        <Keypad handleKeyPress={handleKeyPress}/>
      </div>
    </div>
    </>
  );
}

export default App;
