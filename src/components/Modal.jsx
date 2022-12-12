import React, { useContext } from 'react'
// import { useContext } from 'react'
// import { selectedTickerContext } from '../contexts/SelectedTickerProvider'
import './Modal.scss'

function Modal({ children }) {

    // const { setShowModal, showModal } = useContext(selectedTickerContext)

    // document.addEventListener('click', (e) => {
    //     e.stopPropagation()
    //     if (e.target.classname !== 'modal-ctn') {
    //         setShowModal(false)
    //     }
    // })

    return (
        <div className='modal-background'>
            <div className='modal-ctn'>
                {children}
            </div>
        </div>
    )
}

export default Modal