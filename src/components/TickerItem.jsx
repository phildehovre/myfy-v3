import React, {
    useState,
    // useEffect, 
    useContext
} from 'react';
import { deleteItem } from '../utils/db'
import { getAuth } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import { useQuote } from '../utils/db';

import './TickerItem.scss'
import { selectedTickerContext } from '../contexts/SelectedTickerProvider';

function TickerItem(props) {

    const auth = getAuth()

    const [itemForDeletion, setItemForDeletion] = useState()

    const onDelete = (t) => {
        deleteItem(t, auth.currentUser.uid)
    }

    const { handleTickerSelection } = useContext(selectedTickerContext)

    useState(() => {
    }, [itemForDeletion])

    const { ticker, id } = props
    const [isHovered, setIsHovered] = useState(false)

    // const { isLoading, data, error } = useQuote(ticker)

    return (
        <div className='ticker_item-ctn'
            onClick={() => handleTickerSelection(ticker)}
            onMouseEnter={() => { setIsHovered(id) }}
            onMouseLeave={() => { setIsHovered('') }}
        >
            <span>
                {ticker.symbol}
            </span>
            {isHovered === id &&
                <>
                    <span>{ticker.instrument_name}</span>
                    <FontAwesomeIcon onClick={() => { onDelete(ticker) }} icon={faTrash} />
                </>
            }
        </div>
    )
}

export default TickerItem