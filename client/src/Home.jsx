import React,{useEffect} from 'react';
import { BsFillArchiveFill, BsGrid3X3GapFill, BsPeopleFill, BsBellFill } from 'react-icons/bs';
import { FaSection } from "react-icons/fa6";
import { FaChartArea } from "react-icons/fa";
import { GiEntryDoor,GiWorld } from "react-icons/gi";
import { FcAreaChart } from "react-icons/fc";
import Filter from './Filter'
export default function Home(props) {
	
	

    return (<main className='main-container'>
		<div className='main-cards'>
		    <div className='card'>
		    	<div className='card-inner'>
		    	<h3>SECTORS</h3>
		    	<FaSection className='card_icon'/>
		    </div>
		    <h1>{props.sector}</h1>
		    </div>
		    <div className='card'>
		    	<div className='card-inner'>
		    	<h3>COUNTRIES</h3>
		    	<GiWorld className='card_icon'/>
		    </div>
		    <h1>{props.countries}</h1>
		    </div>
		    <div className='card'>
		    	<div className='card-inner'>
		    	<h3>REGIONS</h3>
		    	<FaChartArea className='card_icon'/>
		    </div>
		    <h1>{props.regions}</h1>
		    </div>
		    <div className='card'>
		    	<div className='card-inner'>
		    	<h3>ENTRIES</h3>
		    	<GiEntryDoor className='card_icon'/>
		    </div>
		    <h1>{props.entries}</h1>
		    </div>
			
		</div>
		<div className='align-center'>
		{props.children}
		</div>
	</main>)
}