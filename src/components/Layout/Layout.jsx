import React,{useEffect,useState} from 'react'
import Style from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <Navbar/>
      <div className="contianer mt-[100px] flex items-center justify-between sm:max-w-xl md:max-w-2xl lg:max-w-5xl 2xl:max-w-7xl mx-auto">
        <Outlet />
      </div>
    </>
  )
}
