import React,{useState,useEffect} from 'react';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    Tooltip,
    Legend
} from 'chart.js'

import { Bar } from 'react-chartjs-2'

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    Tooltip,
    Legend
)

export default function StackedBarChart({labels,store}) {
    const [countryLikelihood,setCountryLikelihood] = useState([])
    const [countryRelevance,setCountryRelevance] = useState([])
    const [countryIntensity,setCountryIntensity] = useState([])
    useEffect(() => {
        const like = [];
        const relav = [];
        const intense = []
        labels.forEach((n) => {
            const sumOfLikelihoods = store
                .filter((entry) => entry.country === n)
                .map((e) => e.likelihood)
                .reduce((acc, curr) => (acc + curr), 0);
            const sumOfRelevance = store
                .filter((entry) => entry.country === n)
                .map((e) => parseInt(e.relevance))
                .reduce((acc, curr) => (acc + curr), 0);
            const sumOfIntensity = store
                .filter((entry) => entry.country === n)
                .map((e) => e.intensity)
                .reduce((acc, curr) => (acc + curr), 0);
            like.push(Math.log(sumOfLikelihoods));
            relav.push(Math.log(sumOfRelevance));
            intense.push(Math.log(sumOfIntensity));
        });
        setCountryLikelihood([...like]);
        setCountryRelevance([...relav]);
        setCountryIntensity([...intense])

    }, [store, labels]);

    const data = {
    	labels:labels,
    	datasets:[
           {
           	label:'Likelihood',
           	data:countryLikelihood,
           	backgroundColor:'rgba(0,255,255,0.5)'
           },
           {
           	label:'Relevance',
           	data:countryRelevance,
           	backgroundColor:'rgba(255,255,0,0.7)'
           },
           {
            label:'Intensity',
            data:countryIntensity,
            backgroundColor:'rgba(255,0,0,0.5)'
           }
    		]

    };
    const options = {
        scales:{
        	x:{
        		stacked:true
        	},
        	y:{
        		stacked:true
        	}
        }
    }

    return ((countryIntensity.length || countryLikelihood.length || countryRelevance.length) && (<div className='chart-container'>
        <p className='chart-title'>Distribution of likelihood, intensity and relevance across countries</p>
		<Bar data={data} options={options}/>
	</div>))
}