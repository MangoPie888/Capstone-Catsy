import React, {useContext,useRef, useState, useEffect} from "react";
import ReactDom from  "react-dom";
import "./Modal.css";


const ModalContext = React.createContext();

export function ModalProvider({children}) {
    const modalRef = useRef();
    const [value,setValue] = useState();

    useEffect(()=>{
        setValue(modalRef.current)
    },[])

    return (
        <>
            <ModalContext.Provider value={value}>
                {children}
            </ModalContext.Provider>
            <div ref={modalRef} />
        </>
    )
}

export function Modal({onClose,children}) {
    const modalNode = useContext(ModalContext);
    if(!modalNode) return null;

    return ReactDom.createPortal(
        <div id="modal">
        <div id="modal-background" onClick={onClose} />
           
            <div id="modal-content">
                <div id="modal-close" onClick={onClose}>
                <i class="fa-solid fa-xmark"></i>
                </div>
                {children}
            </div>
        </div>,
        modalNode
    )
}