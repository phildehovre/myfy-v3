import React from 'react'
import { useState } from 'react'
import { useNews } from '../utils/db'
import Carousel from './Carousel'
import Spinner from './Spinner'

function NewsCarousel() {

    const [articles, setArticles] = useState()
    const [isUpdateWindow, setIsUpdateWindow] = useState(false)


    const onSuccess = (data) => {
        setIsUpdateWindow(true)
        setArticles(data.data.articles)
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