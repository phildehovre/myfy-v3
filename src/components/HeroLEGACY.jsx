import React, { useState, useEffect } from 'react'
import Section from './Section'
import './Hero.scss'

function Hero(props) {

    const [dotx, setDotx] = useState(45)
    const [doty, setDoty] = useState(45)


    useEffect(() => {
        window.addEventListener('mousemove', (e) => {
            setDotx((e.clientX / (e.screenY * 0.5)) * 10);
            setDoty((e.clientY / e.screenY) * 80);
        })
    })


    useState(() => {
        window.addEventListener('mouseleave', () => {
            setDotx(55)
            setDoty(55)
        })
    })

    const irisStyles = {
        transform: `translate(${dotx}%, ${doty}%)`
    }
    const pupilStyles = {
        transform: `translate(${dotx * 1.2}%, ${doty * 1.2}%)`
    }

    const { height } = props
    return (
        <Section display='flex' height={height} >
            <div className='tagline-ctn'>
                <div className='logo-ctn'>
                    <div className='eye'>
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

export default Hero