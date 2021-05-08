import React, { useState } from 'react';
import Modal from 'react-modal';

export default function ModalComponent({children}) {
  const [ modalIsOpen, setIsOpen ] = useState(false);
  function openModal(){
    setIsOpen(true);
  }
  function closeModal(){
    setIsOpen(false);
  }
  return (
    <>
    <Modal
      isOpen={modalIsOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      {children}
    </Modal>
    </>
  )
}


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
