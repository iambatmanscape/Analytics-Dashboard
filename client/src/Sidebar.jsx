import React, { useState,useContext } from 'react';
import { Link } from 'react-router-dom'
import { BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsGrid3X3GapFill, BsPeopleFill, BsListCheck } from 'react-icons/bs';
import { RiMenuUnfoldFill } from "react-icons/ri";
import { IoFilter } from "react-icons/io5";
import { MdOutlineArrowDropDown } from "react-icons/md";
import {ShowContext} from './App'

export default function Sidebar() {

    const {open,setOpen} = useContext(ShowContext);
    return (<aside id='sidebar'>
    <div className='sidebar-title'>
      <div className='sidebar-brand'>
        <RiMenuUnfoldFill className='icon-header'/> Home
      </div>
     </div>
      <ul className='sidebar-list'>
       <li className='sidebar-list-item' onClick={()=>setOpen(true)}>
          
            <IoFilter className='icon'/> Filter  <MdOutlineArrowDropDown className='icon'/>
          
        </li>
        <li className='sidebar-list-item'>
          
            <BsGrid3X3GapFill className='icon'/> Dashboard
          
        </li>
         <li className='sidebar-list-item'>
          
            <BsGrid1X2Fill className='icon'/> Product
          
        </li>
         <li className='sidebar-list-item'>
          
            <BsFillArchiveFill className='icon'/> Categories
          
        </li>
         <li className='sidebar-list-item'>
          
            <BsPeopleFill className='icon'/> Customers
          
        </li>
         <li className='sidebar-list-item'>
          
            <BsCart3 className='icon'/> Inventory
          
        </li>
         <li className='sidebar-list-item'>
          
            <BsListCheck className='icon'/> Reports
          
        </li>
      </ul>
     
  </aside>)
}