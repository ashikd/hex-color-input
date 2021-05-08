import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [inputVal, setInputVal] = useState('');
  const [toggle, setToggle] = useState(true);
  const [warningData, toggleWarning] = useState({showWarning: false, invalidVals: []});
  const [linkObjs, setLinkObjs] = useState([]);

  const textInput = useRef();

  const onChangeHandler = (e) => {
    setInputVal(e.target.value)
  }

  const parseInput = () => {
    const valArray = inputVal.split(/[ ;]+/);
    const hexRegex = /^#[A-Fa-f0-9]{6}$/;
    const valOutput = valArray.map(val => hexRegex.test(val.trim()));
    const inValidValues = valArray.filter(val => !hexRegex.test(val.trim()))
    const validValues = valArray.filter(val => hexRegex.test(val.trim()))
    if(valOutput.includes(false)){
      toggleWarning({showWarning: true, invalidVals: inValidValues})
    }else{
      toggleWarning({showWarning: false, invalidVals: []})
    }
    setLinkObjs(validValues);
  }

  const onFocusOutHandler = () => {
    setToggle(false);
    parseInput();
  }

  const onClickHandler = (e) => {
    if(e.target === e.currentTarget){
      setToggle(true);
    }else{
      colorChange(e)
    }
  }

  const colorChange = (e, val) => {
    const linkValues = linkObjs;
    linkValues.forEach((item, index) => {
      if(val === item) {
        linkValues[index] = e.target.value;
      }
    });
    setLinkObjs([...linkValues])
  }

  useEffect(() => {
    toggle && textInput.current.focus();
  }, [toggle, textInput]);

  return (
    <div className="App">
      <label className="inputLabel" for="hexInputBox">Enter Hex Color values:</label>
      {
        toggle ?
        <>
          <input
            ref={textInput}
            type="text"
            name="hexInputBox"
            onChange={onChangeHandler}
            onBlur={onFocusOutHandler}
            value={inputVal}
            className="inputBox"
            autocomplete="off"
          />
        </>
        :
        <div onClick={onClickHandler} className="inputBox">
          {linkObjs.map((val, index) => <span key={`${index}-${val}`} ><div className="linkBlock">
              {val}
              <input
                type="color"
                className="hiddenInput"
                onChange={(e)=>colorChange(e, val)}
                value={val}
              />
          </div>&nbsp;</span>)}
        </div>
      }
      { warningData.showWarning &&
        <p className="warningMessage">
          {`Following are not valid hex code values: ${warningData.invalidVals.toString()}`}
        </p>
      }
    </div>
  );
}

export default App;
