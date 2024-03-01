import React, { useState, useEffect } from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip
} from 'chart.js'

import { Doughnut } from 'react-chartjs-2'

ChartJS.register(
    ArcElement,
    Tooltip
)

export default function DoughnutChart({ labels, store }) {
    const [showChart,setShowChart] = useState(true)
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    const [frequency, setFrequency] = useState({});
    const [color, setColor] = useState([]);

    useEffect(() => {
        const map = {};
        const newColor = []
        store.forEach((entry) => {
            if (entry.country !== '') {
                const country = entry.country.toLowerCase()
                if (map[country]) {
                    map[country]++;
                } else {
                    map[(country)] = 1;
                    newColor.push(getRandomColor())
                }
            }

        });
        setFrequency(map)
        setColor(newColor)
    }, [labels, store])

    useEffect(()=>{
       if(frequency.length<0) {
          setShowChart(false)
       }
    },[frequency])

    const data = {
        labels: Object.keys(frequency),
        datasets: [{
            data: Object.values(frequency),
            backgroundColor: color,
            weight:0.05
        }]
    }
    const options = {
        plugins: {
            legend: {
                display: false
            }
        }
    }
    return (labels.length && (<div className='chart-container'>
        <p className='chart-title'>Entries from different countries</p>
        <Doughnut data={data} options={options}/>
    </div>))
}