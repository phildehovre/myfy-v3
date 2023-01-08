// import { 
//     getAuth, 
//     onAuthStateChanged 
// } from 'firebase/auth'
import React, {
    useContext,
    //  useEffect, 
    //  useState 
} from 'react'
import {
    useQuote,
    // useWatchlistByOwner 
} from '../utils/db'
import Spinner from './Spinner'
import './TickerQuote.scss'
import './InputRange.scss'
import { selectedTickerContext } from '../contexts/SelectedTickerProvider'
import { useNavigate } from 'react-router-dom'

function TickerQuote() {

    const navigate = useNavigate()

    const onSuccess = (data) => {
        if (data.data.code === 429) {
            alert(data.data.message)
            navigate('/')
        }
    }

    const onError = (err) => {
        console.log(err)
    }

    const {
        selectedTicker,
        interval,
    } = useContext(selectedTickerContext)

    const {
        isLoading: isQuoteLoading,
        data: quoteData,
        error: quoteError
    } = useQuote(selectedTicker, interval, onSuccess, onError)

    console.log(quoteData)

    const renderRange = () => {
        if (quoteData.data.code === 400) {
            return (
                <div>{quoteData.data.message}</div>
            )
        }
        if (!isQuoteLoading
            && !quoteError
            && quoteData.data !== undefined
        ) {
            const { high, low } = quoteData.data.fifty_two_week
            return (
                <div className='price_range-ctn'>
                    <h4>52-week range:</h4>
                    <span className='range-ctn'>
                        {Number(low)}
                        <input readOnly type='range' min={low} max={high} value={quoteData.data.close} />
                        <span className='range-percentage'></span>
                        {Number(high)}
                    </span>
                </div>

            )
        }
    }

    return (
        <>
            {isQuoteLoading &&
                <Spinner />
            }

            {!isQuoteLoading && !quoteError && quoteData?.data !== undefined &&
                < div className='quote-ctn'>
                    <h1>{quoteData?.data.symbol}</h1>
                    <p>{quoteData?.data.name}</p>
                    <span>
                        <h4>Open:</h4>
                        <p>{quoteData?.data.open}</p>
                    </span>
                    <span>
                        <h4>Close:</h4>
                        <p>{quoteData?.data.close}</p>
                    </span>
                    <span>
                        <h4>Previous Close:</h4>
                        <p style={{ display: 'flex' }}>{quoteData?.data.previous_close}
                        </p>
                    </span>
                    <span>
                        <h4>Change in %:</h4>
                        <span style={{ color: `${quoteData?.data.percent_change >= 0 ? 'lightgreen' : 'salmon'}`, fontSize: '.8em' }}>
                            {`
                                ${quoteData?.data.percent_change}%`}
                        </span>
                    </span>
                    <span>
                        <h4>Average volume:</h4>
                        <p>{quoteData?.data.average_volume}</p>
                    </span>
                    <span>
                        <h4>Average volume:</h4>
                        <p>{quoteData?.data.average_volume}</p>
                    </span>
                    {renderRange()}
                </div>
            }
        </>
    )
}

export default TickerQuote