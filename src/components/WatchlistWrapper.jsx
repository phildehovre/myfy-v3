import React, { useContext } from 'react'
import Spinner from './Spinner'
import Watchlist from './Watchlist'
// import { useWatchlistByOwner } from '../utils/db'
import { selectedTickerContext } from '../contexts/SelectedTickerProvider'

function WatchlistWrapper({ user }) {

    const {
        isWatchlistLoading,
        watchlistData,
        watchlistError,
    } = useContext(selectedTickerContext)



    return (
        <div className='watchlist-wrapper'>
            {
                isWatchlistLoading && !watchlistData
                    ? <Spinner />
                    : <Watchlist user={user} />
            }

        </div>
    )
}

export default WatchlistWrapper