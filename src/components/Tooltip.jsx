import './Tooltip.scss'

import React, { useState, useEffect } from 'react'

function Tooltip(props) {

    const { isHovered, content } = props
    const [detailsPosition, setDetailsPosition] = useState({ xAxis: 0, yAxis: 0 })


    useEffect(() => {
        window.addEventListener('mousemove', (e) => {
            setDetailsPosition({ xAxis: e.clientX, yAxis: e.clientY })
        })
    });


    const detailsStyles = {
        top: `${detailsPosition.yAxis}px`,
        left: `${detailsPosition.xAxis + 10}px`
    }

    return (
        <>
            <div className='tooltip-ctn' style={detailsStyles}>{content}</div>
        </>
    )
}

export default Tooltip