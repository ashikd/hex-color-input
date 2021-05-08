import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import './App.css';

function App() {
  const [inputVal, setInputVal] = useState('');
  const [toggle, setToggle] = useState(true);
  const [warningData, toggleWarning] = useState({showWarning: false, invalidVals: []});
  const [linkObjs, setLinkObjs] = useState([]);
  const [ modalData, setModalData ] = useState({isOpen: false, displayVal: ""});
  // function openModal(){
  //   setIsOpen({isOpen: true, displayVal: ""});
  // }
  function closeModal(){
    setModalData({isOpen: false, displayVal: ""});
  }
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
    // const validInputCheck = /^#[A-Fa-f0-9]+(\s;)/;
    // const isValid = validInputCheck.test(inputVal);
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

  const showMessage = (e,val) => {
    // e.preventDefault();
    // setModalData({isOpen: true, displayVal: val});

  }

  const colorChange = (e, val) => {
    console.log(e.target.value)
    const linkValues = linkObjs;
    linkValues.forEach((item, index) => {
      if(val === item) {
        linkValues[index] = e.target.value;
      }
    });
    console.log(linkValues)
    setLinkObjs(linkValues)
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
          {linkObjs.map((val, index) => <div key={`${val}${index}`} className="linkBlock">
              {val}
              <input
                type="color"
                className="hiddenInput"
                onChange={(e)=>colorChange(e, val)}
                value={val}
              />&nbsp;
          </div>)}
        </div>
      }
      { warningData.showWarning &&
        <p className="warningMessage">
          {`Following are not valid hex code values: ${warningData.invalidVals.toString()}`}
        </p>
      }
      <Modal
        isOpen={modalData.isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="modalContentWrapper">
          <h1>
            {`I have completed the assignment, ${modalData.displayVal}`}
          </h1>
          <button className="modalCloseButton" onClick={closeModal}>Close</button>
        </div>
      </Modal>
    </div>
  );
}

const customStyles = {
  content : {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    backgroundColor: '#F0F0F0',
  }
};

export default App;
