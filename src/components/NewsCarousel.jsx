import React from 'react'
import { useState } from 'react'
import { useNews } from '../utils/db'
import Carousel from './Carousel'
import Spinner from './Spinner'
import axios from 'axios'
import { useEffect } from 'react'

function NewsCarousel() {

    const [articles, setArticles] = useState()
    const [isUpdateWindow, setIsUpdateWindow] = useState(false)

    console.log(articles)

    const onSuccess = (data) => {
        console.log(data.data.results)
        setIsUpdateWindow(true)
        setArticles(data.data.results)
        setTimeout(() => {
            setIsUpdateWindow(false)
        }, 0)
    }

    const rotate = () => {
        const slice = articles.slice(1, articles.length)
        const slicedCell = articles.slice(0, 1)
        setArticles([...slice, ...slicedCell])
    }
    const onError = (err) => {
        console.log(err)
    }

    const { isLoading, data, error } = useNews('', 8, onSuccess, onError)

    // useEffect(() => {
    //     axios.get('https://newsdata.io/api/1/news?apikey=pub_13963ae6636361e7833f616fb9725134dde63&q=pegasus&language=en')
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err))

    // }, [])




    return (
        <>
            {isLoading && <Spinner />}
            {articles &&
                <Carousel
                    articlesArray={articles}
                    rotate={rotate}
                    isUpdateWindow={isUpdateWindow}
                    isLoading={isLoading}
                />
            }
        </>
    )
}

export default NewsCarousel