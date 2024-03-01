import React, { useRef,useState,useEffect } from 'react';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    RadialLinearScale,
    Filler
} from 'chart.js';

import { Radar } from 'react-chartjs-2';

ChartJS.register(
    LineElement,
    PointElement,
    Tooltip,
    Legend,
    RadialLinearScale,
    Filler
)

export default function RadarChart({ labels, store }) {
    const radarRef = useRef();
    const [sectorLikelihood, setSectorLikelihood] = useState([]);
    const [sectorRelevance, setSectorRelevance] = useState([]);
    const [sectorIntensity, setSectorIntensity] = useState([]);

    useEffect(() => {
        const like = [];
        const relav = [];
        const intense = []
        labels.forEach((n) => {
            const sumOfLikelihoods = store
                .filter((entry) => entry.sector === n)
                .map((e) => e.likelihood)
                .reduce((acc, curr) => (acc + curr), 0);
            const sumOfRelevance = store
                .filter((entry) => entry.sector === n)
                .map((e) => parseInt(e.relevance))
                .reduce((acc, curr) => (acc + curr), 0);
            const sumOfIntensity = store
                .filter((entry) => entry.sector === n)
                .map((e) => e.intensity)
                .reduce((acc, curr) => (acc + curr), 0);
            like.push(Math.log(sumOfLikelihoods));
            relav.push(Math.log(sumOfRelevance));
            intense.push(Math.log(sumOfIntensity))
        });
        setSectorLikelihood([...like]);
        setSectorRelevance([...relav]);
        setSectorIntensity([...intense])

    }, [store, labels]);

    const data = {
        labels: labels,
        datasets: [{
                label: 'Likelihood',
                data: sectorLikelihood,
                backgroundColor: 'rgba(0,255,255,0.5)',

            },
            {
                label: 'Relevance',
                data: sectorRelevance,
                backgroundColor: 'rgba(255,255,0,0.7)',

            },
            {
                label: 'Intensity',
                data: sectorIntensity,
                backgroundColor: 'rgba(255,0,0,0.5)'
            }

        ]
    };
    const options = {

    }

    return (<div className='chart-container'>
        <p className='chart-title'>Comparison Across Topic</p>
        <p className='chart-subtitle'>Range of intensity, likelhood and relevance</p>
        <Radar ref={radarRef}
        data={data}
        options={options}
        ></Radar>
        <p></p>
    </div>)
}