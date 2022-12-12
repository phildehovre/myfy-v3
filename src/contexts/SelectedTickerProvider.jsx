import { getAuth, } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import {
    // useTimeSeries,
    useWatchlistByOwner,
    //   useQuote,
    useBatchRequest
} from '../utils/db'
import { useAuthState } from 'react-firebase-hooks/auth'

export const selectedTickerContext = new React.createContext()

function SelectedTickerProvider({ children }) {

    const [selectedTicker, setSelectedTicker] = useState()
    const [interval, setInterval] = useState('5min')
    const [showModal, setShowModal] = useState(true)
    const [tickerArray, setTickerArray] = useState([])
    const [tickerData, setTickerData] = useState()


    const auth = getAuth()
    const [user, loading, userError] = useAuthState(auth)

    // Async data fetching

    const onSuccess = (data) => {
        if (data.data.code === 429) {
            setShowModal(true)
        }
    }

    console.log('context rerender')

    const onWatchlistSuccess = (data) => {
    }
    const onWatchlistError = (data) => {
        // console.log(data)
    }

    const {
        data: batchData,
        isLoading: isBatchLoading,
        error: batchError
    } = useBatchRequest(tickerArray, interval, onSuccess)

    const {
        data: watchlistData,
        isLoading: isWatchlistLoading,
        error: watchlistError
    } = useWatchlistByOwner(user?.uid, onWatchlistSuccess, onWatchlistError)


    useEffect(() => {
        if (watchlistData?.watchlist.length > 0) {
            watchlistData.watchlist.forEach((val) => {
                setTickerArray(prev => { return [...prev, val.symbol] })
            })
        }
    }, [watchlistData])

    useEffect(() => {
        if (tickerArray?.length > 0) {
            setTickerData(batchData?.data[selectedTicker])
        }
    }, [tickerArray])


    // Display top of stack ticker on mount
    useEffect(() => {
        if (!isWatchlistLoading && user && !selectedTicker) {
            setSelectedTicker(watchlistData?.watchlist[0])
        }
    })


    const handleTickerSelection = (t) => {
        setSelectedTicker(t)
    }

    const value = {
        isWatchlistLoading,
        watchlistData,
        watchlistError,
        interval,
        setInterval,
        handleTickerSelection,
        selectedTicker,
        tickerData,
        isBatchLoading,
        batchData,
        batchError,
        showModal, setShowModal
    }

    return (
        <selectedTickerContext.Provider value={value}>
            {children}
        </selectedTickerContext.Provider>
    )
}

export default SelectedTickerProvider