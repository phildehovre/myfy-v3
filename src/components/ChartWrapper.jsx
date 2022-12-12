import React, { useContext, useEffect, useState } from 'react'
import Chart from './Chart'
// import { useTimeSeries } from '../utils/db'
import './Chart.scss'
import { selectedTickerContext } from '../contexts/SelectedTickerProvider'

function ChartWrapper({ selectedTicker }) {

    const [sampleSize, setSampleSize] = useState(200)
    const [sample, setSample] = useState(null)
    const [chartData, setChartData] = useState(null)
    const [displayedInterval, setDisplayedInterval] = useState()
    const [interval, setInterval] = useState()

    const {
        batchData,
        // tickerData: data,
        isTickerLoading: isLoading,
        isTickerError: errors
    } = useContext(selectedTickerContext)


    useEffect(() => {
        let data = batchData?.data[selectedTicker?.symbol]
        setSample(data?.values.slice(0, sampleSize).reverse())
    }, []);

    // useEffect(() => {
    //     setSample(data?.data.values.slice(0, sampleSize).reverse())
    // }, [data]);

    const handleTimeFrameChange = (interval, sampleSize, intervalString) => {
        setInterval(interval);
        setSampleSize(sampleSize);
        setDisplayedInterval(intervalString)

    };


    useEffect(() => {
        if (sample && sample !== null) {
            const backgroundColor = sample[0].close > sample[sample.length - 1].close ? 'rgba(255, 99, 132, 0.5)' : "rgba(75,192,192,0.2)"
            const labels = sample?.map((i) => { return i.datetime })
            let data
            data = {
                labels: labels,
                datasets: [{
                    label: 'Adj. Close',
                    data: sample.map(i => i.close),
                    backgroundColor: backgroundColor,
                    fill: true
                }]
            };
            setChartData(data);
        };
        if (isLoading) {
            let data
            data = {
                labels: [],
                datasets: []
            }
            setChartData(data)
        }
    }, [sample]);


    const handleSampleSizeChange = (val) => {
        if (val > 0 && sampleSize <= 5000) {
            setSampleSize(prev => prev + 5)
        } else if (val < 0 && sampleSize > 5) {
            setSampleSize(prev => prev - 5)
        };
    };

    const renderChart = () => {
        if (isLoading) {
            return (
                <div>Loading...</div>
            )
        };

        if (!isLoading && chartData && !errors) {
            return (
                <Chart data={chartData} handleSampleSizeChange={handleSampleSizeChange} />
            )
        };

        return (
            <div>{errors}</div>
        )
    };

    return (
        <div className='chart_wrapper'>
            <h3 id='displayed-interval'>{displayedInterval}</h3>
            {renderChart()}
            {
                selectedTicker &&
                <div>
                    <button onClick={() => handleTimeFrameChange('1min', 177, 'Daily')}>1d</button>
                    <button onClick={() => handleTimeFrameChange('30min', 100, 'Weekly')}>1w</button>
                    <button onClick={() => handleTimeFrameChange('2h', 87, 'Monthly')}>1m</button>
                    <button onClick={() => handleTimeFrameChange('1day', 130, '6 months')}>6m</button>
                    <button onClick={() => handleTimeFrameChange('1day', 255, 'One year')}>1y</button>
                    <button onClick={() => handleTimeFrameChange('1week', 260, '3 years')}>3y</button>
                </div>
            }

        </div>
    )
};

export default ChartWrapper;