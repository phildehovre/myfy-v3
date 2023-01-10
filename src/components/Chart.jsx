import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, Filler, LineController, LineElement, PointElement, CategoryScale, LinearScale, Title, defaults } from 'chart.js';
import './Chart.scss'

ChartJS.register(LineController, Filler, LineElement, PointElement, LinearScale, CategoryScale, Title);

function Chart({ data, handleSampleSizeChange }) {

    const handleWheelOverChart = (e) => {
        console.log('wheel')
        handleSampleSizeChange(e.deltaY);
    };

    return (
        <div className='chart-ctn'>
            <Line
                data={data}
                options={
                    {
                        tension: .25, radius: 2,
                        plugins: {
                            tooltip: {
                                enabled: true,

                            },
                            afterDraw: chart => {
                                if (chart.tooltip?._active?.length) {
                                    let x = chart.tooltip._active[0].element.x;
                                    let yAxis = chart.scales.y;
                                    let ctx = chart.ctx;
                                    ctx.save();
                                    ctx.beginPath();
                                    ctx.moveTo(x, yAxis.top);
                                    ctx.lineTo(x, yAxis.bottom);
                                    ctx.lineWidth = 1;
                                    ctx.strokeStyle = 'rgba(0, 0, 255, 0.4)';
                                    ctx.stroke();
                                    ctx.restore();
                                }
                            }
                        },

                        interaction: {
                            mode: 'x'
                        }
                    }
                }
                onWheel={e => { handleWheelOverChart(e) }}
            />
        </div>
    );
};

export default Chart