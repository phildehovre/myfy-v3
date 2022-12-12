import React from 'react'
import './PageContainer.scss'

function PageContainer(props) {

    const { children } = props
    return (
        <div className='page-ctn'>{children}</div>
    )
};

export default PageContainer;