import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext } from 'react'
import Spinner from './Spinner'
import TickerItem from './TickerItem'
import './Watchlist.scss'
import { selectedTickerContext } from '../contexts/SelectedTickerProvider'

function Watchlist({ handleTickerItemClick, user }) {

    const {
        isWatchlistLoading,
        watchlistData,
        watchlistError,
    } = useContext(selectedTickerContext)

    const renderWatchlist = () => {
        if (isWatchlistLoading) {
            return (
                <Spinner />
            )

        }
        if (watchlistError) {
            alert(watchlistError.message)
        }


        if (watchlistData && !isWatchlistLoading) {
            return watchlistData.watchlist.map((ticker, i) => {
                return (
                    <TickerItem
                        ticker={ticker}
                        key={i}
                        handleTickerItemClick={handleTickerItemClick}
                        id={i}
                    />
                )
            })
        }
    }


    return (<>
        <div>
            <div className='watchlist-ctn'>
                {renderWatchlist()}
            </div>
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            <span className='watchlist-header'>Today:</span>
        </div>

    </>
    )
}

export default Watchlist