import React from 'react'
import { useGlobalState } from "../context/GlobalState";

const Modal = (props) => {
    const { state, setState } = useGlobalState();
  return (
    <div className="modal-wrapper">
        <div className="modal">
        <div>{props.text}</div>
        <button onClick={() => setState((prevState) => ({ ...prevState, modal: false }))}>Ok</button>
        </div>
    </div>
  )
    
}

export default Modal