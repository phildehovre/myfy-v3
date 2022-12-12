import React, { useContext, useState } from 'react'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { updateWatchlist } from '../utils/db'
import { auth } from '../config/firebase'
import { uuidv4 } from '@firebase/util'
import { selectedTickerContext } from '../contexts/SelectedTickerProvider'
import { useEffect } from 'react'

function AutoComplete(props) {

    const { term,
        setShow,
        show,
        autoComplete,
    } = props;

    useEffect(() => {
        window.addEventListener('click', () => { setShow(false) })
    })

    const [showButton, setShowButton] = useState(false);
    const [isHovered, setIsHovered] = useState(null);

    const { handleTickerSelection } = useContext(selectedTickerContext)

    const handleTickerClick = (t) => {
        setShow(false)
        handleTickerSelection(t)
    };

    const handleAddToWatchlist = (e, val) => {
        e.stopPropagation()
        updateWatchlist(auth.currentUser.uid, val)

    }

    const handleMouseEnter = (val) => {
        setIsHovered(val)
    };

    const handleMouseLeave = (e) => {
        setShowButton('')
    };

    const renderAutoComplete = () => {
        if (term && show && autoComplete && autoComplete.length > 0) {
            return autoComplete.map((val, i) => {
                return (
                    <li className='autocomplete-list-item'
                        key={uuidv4()}
                        onClick={() => handleTickerClick(val)}
                        onMouseEnter={(e) => handleMouseEnter(i)}
                    >
                        <span className='symbol'>
                            {val.symbol}
                        </span>
                        <span className='name'>
                            {val.instrument_name}
                        </span>
                        <span className='type'>
                            {val.instrument_type}
                        </span>
                        <span className='currency'>
                            {val.currency}
                        </span>
                        <div
                            className={`watchlist_add-btn ${isHovered === i && showButton ? 'visible' : ''}`}
                            onClick={(e) => { handleAddToWatchlist(e, val) }}
                        >
                            <FontAwesomeIcon icon={faPlus} size='lg' style={{ color: 'grey' }} />
                        </div>
                    </li>
                )
            })
        };
    };

    return (
        <div className='autocomplete-list'
            onMouseEnter={() => { setShowButton(true) }}
            onMouseLeave={() => { setShowButton(false) }}
        >{renderAutoComplete()}</div>
    )
};

export default AutoComplete;