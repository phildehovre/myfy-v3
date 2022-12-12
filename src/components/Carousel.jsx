import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import './Carousel.scss'
import Section from './Section';
import CarouselCell from './CarouselCell';

function Carousel({ articlesArray, rotate, isLoading }) {

    const [isRotating, setIsRotating] = useState(false)
    const [isSlicing, setIsSlicing] = useState(false)
    const [isAppearing, setIsAppearing] = useState(false)

    useEffect(() => {
        let init, rotation
        if (!isLoading) {
            init = setTimeout(() => {
                setIsAppearing(!isAppearing)
                setIsSlicing(!isSlicing)
                rotation = setTimeout(() => {
                    rotate()
                }, 1750)
            }, 1750)
        }

    })


    const renderCells = () => {
        return articlesArray.slice(1, articlesArray.length - 2).map((article, i) => {
            return (
                <CarouselCell article={article} className='cell' key={i} />
            )
        })
    }

    return (
        <Section height='12em'>
            <div
                className={`carousel-ctn ${isSlicing ? 'slicing' : ''} ${isRotating ? 'rotating' : ''}`}
            >
                <CarouselCell
                    article={articlesArray[0]}
                    className={`cell ${isSlicing ? 'slicing' : ''} ${isRotating ? 'rotating' : ''}`} />
                {renderCells()}
                <CarouselCell
                    article={articlesArray[articlesArray.length - 2]}
                    className='cell'
                />
                <CarouselCell
                    className={`cell last ${isAppearing ? 'appearing' : ''}`}
                    article={articlesArray[articlesArray.length - 1]}
                />
            </div>
        </Section>
    )
}

export default Carousel