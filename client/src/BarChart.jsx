import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
)

export default function BarChart({ labels, store }) {


    const [map, setMap] = useState({});

    useEffect(() => {
        const newMap = {};
        store.forEach((entry) => {
            if (entry.region !== '') {
                const region = entry.region.toLowerCase()
                if (newMap[region]) {
                    newMap[region]++;
                } else {
                    newMap[(region)] = 1;
                }
            }

        });
        setMap(newMap);
    }, [labels, store])



    const data = {
        labels: Object.keys(map),
        datasets: [{
            label: 'Frequency',
            data: Object.values(map),
            backgroundColor: '#0079cc',
        }]
    }
    const options = {}
    return (<div className='chart-container'>
        <p className='chart-title'>Distribution of frequency of data across various regions</p>
        <Bar data={data} options={options}></Bar>
    </div>)

}