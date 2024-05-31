import React, { useEffect, useRef } from 'react'



import '../Assets/Header.css'

export default function Header(props) {
  const resultref=useRef();
  useEffect(()=>{
    resultref.current.scrollIntoView();
  },[props.history])
  return (
    <div className='header custom-scroll'>
      <div className="header_history">
         {props.history.map((item)=>(
          <p key={item+Math.random()*4}>{item}</p>
          ))}
      <br/>
        <div className="header_expression custom-scroll">
         <p> {props.expression}</p>
         <br/>
          <div className="header_result">
          <p ref={resultref}>{props.result}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
