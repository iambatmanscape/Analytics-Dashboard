import React, { useRef, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Filler
)


export default function LineChart({ labels, store }) {
    const [yearLikelihood, setYearLikelihood] = useState([])
    const [yearRelevance, setYearRelevance] = useState([])
    const [yearIntensity, setYearIntensity] = useState([])
    useEffect(() => {
        const like = [];
        const relav = [];
        const intense = []
        labels.forEach((n) => {
            const sumOfLikelihoods = store
                .filter((entry) => entry.end_year === n)
                .map((e) => e.likelihood)
                .reduce((acc, curr) => (acc + curr), 0);
            const sumOfRelevance = store
                .filter((entry) => entry.end_year === n)
                .map((e) => parseInt(e.relevance))
                .reduce((acc, curr) => (acc + curr), 0);
            const sumOfIntensity = store
                .filter((entry) => entry.end_year === n)
                .map((e) => e.intensity)
                .reduce((acc, curr) => (acc + curr), 0);
            like.push(Math.log(sumOfLikelihoods));
            relav.push(Math.log(sumOfRelevance));
            intense.push(Math.log(sumOfIntensity))
        });
        setYearLikelihood([...like]);
        setYearRelevance([...relav]);
        setYearIntensity([...intense])
    }, [labels, store])

    
    const lineRef = useRef()
    const data = {
        labels: labels,
        datasets: [{
                label: 'Intensity',
                data: yearIntensity,
                backgroundColor: 'rgba(255,0,0,0.5)',
                borderColor: 'rgba(255,0,0,0.5)',
                pointBorderColor: 'rgba(255,0,0,0.5)',


            },
            {
                label: 'Relevance',
                data: yearRelevance,
                backgroundColor: 'rgba(255,255,0,0.7)',
                borderColor: 'rgba(255,255,0,0.7)',
                pointBorderColor: 'rgba(255,255,0,0.7)',

            },
            {
                label: 'Likelihood',
                data: yearLikelihood,
                backgroundColor: 'rgba(0,255,255,0.5)',
                borderColor: 'rgba(0,255,255,0.5)',
                pointBorderColor: 'rgba(0,255,255,0.5)',

            }



        ]
    }
    const options = {
        plugins: {
            legend: true,
        },

    }

    return ((yearIntensity.length>0 ||yearLikelihood.length>0|| yearRelevance.length>0) && (<div className='chart-container'>
        <p className='chart-title'>Time series graph showing the variation of intensity, relevance, and likelihood over time</p>
    <Line ref={lineRef}
     data={data}
     options={options}
    ></Line>
   </div>))
}