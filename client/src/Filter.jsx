import React, { useState, useContext,useEffect,useRef } from 'react'
import { Sheet, Header, Content, Footer, detents, Portal } from 'react-sheet-slide'
import 'react-sheet-slide/style.css'
import { ShowContext,FilterContext } from './App'




export default function Filter() {
    const inputRef = useRef()
    const { open, setOpen } = useContext(ShowContext)
    const [first,setFirst] = useState('')
    const {store,setStore,statStore} = useContext(FilterContext);
    const [option,setOption] = useState([])
    const [filter,setFilter] = useState('');
    
    function reset() {
      setStore(statStore)
      setOpen(false)
    }
   

  function changeOption(val) {
    if(val==='sector') {
     const sectors = [...new Set(statStore.map((entry) => entry.sector))].filter((n) => n !== '');
     setOption(sectors);
    } else if(val==='country') {
      const countries = [...new Set(statStore?.map((entry) => entry.country))].filter((n) => n !== '');
      setOption(countries)
    } else if(val==='pestle') {
      const pestle = [...new Set(statStore?.map((entry) => entry.pestle))].filter((n) => n !== '');
      setOption(pestle)
    } else if(val==='topic') {
      const topic = [...new Set(statStore?.map((entry) => entry.topic))].filter((n) => n !== '');
      setOption(topic)
    } else if(val==='region') {
      const region = [...new Set(statStore?.map((entry) => entry.region.toLowerCase()))].filter((n) => n !== '');
      setOption(region)
    }
      else if(val==='end_year') {
      const year = [...new Set(statStore?.map((entry) => entry.end_year))].filter((n) => n ).toSorted((a,b)=>a-b);
      setOption(year)
    } 
     else if(val==='source') {
      const source = [...new Set(statStore?.map((entry) => entry.source))].filter((n) => n!=='' );
      setOption(source)
    } 
    else if(val==='insight') {
      const insight = [...new Set(statStore?.map((entry) => entry.insight))].filter((n) => n!=='' );
      setOption(insight)
    } 
  }
  useEffect(()=>{
       changeOption(first)
       
  },[first])
  useEffect(()=>{
     if(first !== 'end_year') {
       const filteredStore = statStore.filter((entry)=>entry[first] === filter);
     setStore(filteredStore) 
     } else {
      const filteredStore = statStore.filter((entry)=>entry['end_year']<=parseInt(filter))
     setStore(filteredStore) 
     }
     
     setOpen(false)
     setOption([])
  },[filter])

  

    return (
        <div className="rss-backdrop" >
      <Portal>
        <Sheet
          open={open}
          onDismiss={() => setOpen(false)}
          selectedDetent={detents.large}
          detents={props => [
            detents.large(props),
            detents.medium(props)
          ]}
          scrollingExpands={true}
        >
          <Header className="rss-header" scrolledClassName="rss-header-scrolled">Tags</Header>
          <Content className="rss-content">
            <div className='content'>
               <input className='filter-by' placeholder='Filter By...' type='text' list='data' onChange={({target})=>setFirst(target.value)}
               />
               <datalist id="data">
   
      <option key={1} value='country'>Countries</option>
      <option key={2} value='pestle'>PEST</option>
      <option key={3} value='topic'>Topic</option>
      <option key={4} value='sector'>Sectors</option> 
      <option key={5} value='source'>Source</option>
      <option key={6} value='region'>Region</option>
      <option key={7} value='end_year'>Upto Year</option>
      <option key={8} value='insight'>Insight</option>
  </datalist>
               <input className='filter-by' placeholder='filter...' type='text' list='options' onChange={({target})=>setFilter(target.value)}/>
               <datalist id="options">
                  {option.map((val,i)=><option key={i} value={val}/>)}
               </datalist>

            </div>
          </Content>
          <Footer className="rss-footer">
            <button type="button" onClick={reset} className='reset'>
              Reset
            </button>
          </Footer>
        </Sheet>
      </Portal>
    </div>
    )
}