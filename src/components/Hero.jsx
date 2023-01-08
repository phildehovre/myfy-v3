import React, { useState, useEffect, useRef } from 'react'
import Section from './Section'
import './Hero.scss'

function Hero2(props) {


    const eyeRef = useRef()

    const [xAxis, setXAxis] = useState(50)
    const [yAxis, setYAxis] = useState(50)
    const [centerX, setCenterX] = useState()
    const [centerY, setCenterY] = useState()

    useEffect(() => {
        setCenterX(eyeRef.current?.offsetLeft + (eyeRef.current.clientWidth / 2))
        setCenterY(eyeRef.current?.offsetTop + (eyeRef.current.clientHeight / 2))
    }, [])


    useEffect(() => {
        window.addEventListener('mousemove', (e) => {

            let factorX = (((e.clientX / centerX) - 1) * 100) * 0.3
            let factorY = (((e.clientY / centerY) - 1) * 100) * 0.3

            if (factorY < 0) {
                setYAxis(factorY * 0.2)
            } else {
                setYAxis(factorY * 5)
            }
            if (factorX < 0) {
                setXAxis(factorX * 0.2)
            } else {
                setXAxis(factorX * 1.5)
            }
        })
    })


    const irisStyles = {
        transform: `translate(${xAxis}%, ${yAxis}%)`
    }
    const pupilStyles = {
        transform: `translate(${xAxis * 1.2}%, ${yAxis * 1.2}%)`
    }

    const { height } = props
    return (
        <Section display='flex' height={height} >
            <div className='tagline-ctn'>
                <div className='logo-ctn'>
                    <div className='eye' ref={eyeRef}>
                        <div className='iris' style={irisStyles}>
                            <div className='pupil' style={pupilStyles}>
                            </div>
                        </div>
                    </div>
                    <div className='shadow' ></div>
                </div>
                <div className='tag'>
                    <h1 className='tagline'>Never miss the trade.</h1>
                    <h3 className='subtitle'>With MyFi's all-seeing eye</h3>
                </div>
            </div>
            <div className='dot'
            ></div>
        </Section>
    )
}

export default Hero2