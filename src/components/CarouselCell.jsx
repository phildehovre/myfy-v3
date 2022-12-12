import React from 'react'
import './Carousel.scss'
import './CarouselCell.scss'

function CarouselCell(props) {

    const { className, article } = props
    const { title, source, url, publishedAt, author } = article

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
                <p id='source'>{source.Name}</p>
                <p id='date'>{formatDate(publishedAt)}</p>
            </span>
        </a>
    )
}

export default CarouselCell