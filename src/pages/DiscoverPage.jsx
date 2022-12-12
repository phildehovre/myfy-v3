import React, { useState } from 'react'
import Section from '../components/Section'
import SearchBar from '../components/SearchBar'
import ChartWrapper from '../components/ChartWrapper'

function DiscoverPage() {

    const [selectedTicker, setSelectedTicker] = useState()

    const handleTickerChange = (t) => {
        setSelectedTicker(t)
    }

    return (
        <Section>
            <SearchBar handleTickerChange={handleTickerChange} />
            <ChartWrapper selectedTicker={selectedTicker} />
        </Section>
    )
}

export default DiscoverPage