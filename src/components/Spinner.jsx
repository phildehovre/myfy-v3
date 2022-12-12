import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

function Spinner() {
    return (
        <FontAwesomeIcon className='spinner' icon={faSpinner} size='4x' />
    )
}

export default Spinner