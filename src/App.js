import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import './App.css';

function App() {
  const [inputVal, setInputVal] = useState('');
  const [toggle, setToggle] = useState(true);
  const [warningData, toggleWarning] = useState({showWarning: false, invalidVals: []});
  const [linkObjs, setLinkObjs] = useState([]);
  const [ modalData, setModalData ] = useState({isOpen: false, displayVal: ""});

  const textInput = useRef();

  function closeModal(){
    setModalData({isOpen: false, displayVal: ""});
  }

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
    e.preventDefault();
    if(e.target === e.currentTarget){
      setToggle(true);
    }
  }

  const showMessage = (e,val) => {
    e.preventDefault();
    setModalData({isOpen: true, displayVal: val});
  }

  useEffect(() => {
    toggle && textInput.current.focus();
  }, [toggle, textInput]);

  return (
    <div className="App">
      <label className="inputLabel" htmlFor="hexInputBox">Enter Hex Color values:</label>
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
            autoComplete="off"
          />
        </>
        :
        <div onClick={onClickHandler} className="inputBox">
          {linkObjs.map((val,index) => <span key={`${index}-${val}`}>
            <a href="#" onClick={(e)=>showMessage(e, val)}>{val}</a>&nbsp;
          </span>)}
        </div>
      }
      { warningData.showWarning &&
        <p className="warningMessage">
          {`Following are not valid hex code values: ${warningData.invalidVals.toString()}`}
        </p>
      }
      <Modal
        isOpen={modalData.isOpen}
        ariaHideApp={false}
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
