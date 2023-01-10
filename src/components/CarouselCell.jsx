import React from 'react'
import './Carousel.scss'
import './CarouselCell.scss'

function CarouselCell(props) {

    const { className, article } = props

    // NEWS API 
    // const { title, source: source_id, url, publishedAt: pubDate, author } = article

    // NewsData.io
    const { title, source_id, url, pubDate, author } = article

    // console.log(article)

    const formatTitle = (string) => {
        let allowed = 60
        if (string.length > allowed) {
            return string.split('').slice(0, allowed).join('') + '...'
        }
        return title
    }


    const formatDate = (d) => {
        let date = new Date(d)
        return date.toUTCString().split(' ').slice(0, 3).join(' ')
    }


    return (
        <a id='cell-ctn' href={url} target='_blank' className={className}>
            <h3 id='cell-title'>{formatTitle(title)}
            </h3>
            <span id='details'>
                <p id='source'>{source_id}</p>
                <p id='date'>{formatDate(pubDate)}</p>
            </span>
        </a>
    )
}

export default CarouselCell