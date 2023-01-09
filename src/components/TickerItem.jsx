import React, {
    useState,
    useContext, useEffect
} from 'react';
import { deleteItem } from '../utils/db'
import { getAuth } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import './TickerItem.scss'
import { selectedTickerContext } from '../contexts/SelectedTickerProvider';
import Tooltip from './Tooltip'

function TickerItem(props) {

    const auth = getAuth()

    const [itemForDeletion, setItemForDeletion] = useState()
    const [isHovered, setIsHovered] = useState(false)
    const [detailsPosition, setDetailsPosition] = useState({ xAxis: 0, yAxis: 0 })

    const onDelete = (t) => {
        deleteItem(t, auth.currentUser.uid).then(() => {
            selectFirstTicker()
        })
    }

    const { handleTickerSelection, selectFirstTicker } = useContext(selectedTickerContext)

    useState(() => {
    }, [itemForDeletion])

    const { ticker, id } = props


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
                    {/* <div className='ticker_details-ctn' style={detailsStyles}>{ticker.instrument_name}</div> */}
                    <Tooltip isHovered={isHovered} content={ticker.instrument_name} />
                    <FontAwesomeIcon onClick={() => { onDelete(ticker) }} icon={faTrash} />
                </>
            }
        </div>
    )
}

export default TickerItem