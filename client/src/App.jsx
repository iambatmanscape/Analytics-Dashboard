import React, { useState, useEffect, createContext } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Home from './Home';
import RadarChart from './RadarChart';
import LineChart from './LineChart';
import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';
import StackedBarChart from './StackedBarChart';
import Loader from './Loader'
import { fetchData } from './fetchData.js';
import Filter from './Filter'
import './App.css'

export const ShowContext = createContext(null)
export const FilterContext = createContext(null)

export default function App() {
    const [open, setOpen] = useState(false)
    const [store, setStore] = useState([]);
    const [sectors, setSectors] = useState([]);
    const [years, setYears] = useState([]);
    const [countries, setCountries] = useState([])
    const [region, setRegion] = useState([])
    const [statStore, setStatStore] = useState([])
    const [showLoader, setShowLoader] = useState(true)
    const [fetchError, setFetchError] = useState(false)

    const fetchedData = async () => {
        try {
            const res = await fetchData();
            setStatStore(res);
            setStore(res);
            setShowLoader(false);
            setFetchError(false);
        } catch (err) {
            setShowLoader(false);
            setFetchError(true);
        }
    }

    useEffect(() => {
        fetchedData();
    }, [])

    useEffect(() => {
        setSectors([...new Set(store?.map((entry) => entry.sector))].filter((n) => n !== ''));
        setYears([...new Set(store?.map((entry) => entry.end_year))].filter((n) => n).sort((a, b) => a - b));
        setCountries([...new Set(store?.map((entry) => entry.country))].filter((n) => n !== ''));
        setRegion([...new Set(store?.map((entry) => (entry.region).toLowerCase()))].filter((n) => n !== ''));
    }, [store])

    return (
        <div className='grid-container'>
            <ShowContext.Provider value={{ open, setOpen }}>
                <Header />
                <Sidebar />
                <FilterContext.Provider value={{ store, setStore, statStore }}>
                    <Filter />
                </FilterContext.Provider>
                {fetchError ? (
                    <div>Failed to fetch data</div>
                ) : (
                    <>
                        {showLoader ? (
                            <Loader />
                        ) : (
                            <>
                                {statStore && statStore.length > 0 ? (
                                    <Home
                                        sector={sectors.length}
                                        entries={store.length}
                                        regions={region.length}
                                        countries={countries.length}
                                    >
                                        <div className='flex'>
                                            <RadarChart labels={sectors} store={store} />
                                            <DoughnutChart labels={countries} store={store} />
                                        </div>
                                        <StackedBarChart labels={countries} store={store} />
                                        <BarChart labels={region} store={store} />
                                        <LineChart labels={years} store={store} />
                                    </Home>
                                ) : (
                                    <h2 style={{marginTop:'1rem'}}>No data available</h2>
                                )}
                            </>
                        )}
                    </>
                )}
            </ShowContext.Provider>
        </div>
    )
}
