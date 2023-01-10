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


    const onSuccess = (data) => {
        console.log(data)
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



    // useEffect(() => {
    //     const options = {
    //         method: 'GET',
    //         url: 'https://bing-news-search1.p.rapidapi.com/news',
    //         params: { safeSearch: 'Off', textFormat: 'Raw' },
    //         headers: {
    //             'X-BingApis-SDK': 'true',
    //             'X-RapidAPI-Key': 'da84ee4161msha3be62b366ce120p144016jsn1e9700f66b86',
    //             'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
    //         }
    //     };
    //     axios.request(options).then(function (response) {
    //         console.log(response.data);
    //     }).catch(function (error) {
    //         console.error(error);
    //     });

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