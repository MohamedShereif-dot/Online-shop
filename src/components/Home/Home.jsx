import React,{useEffect,useState} from 'react'
import Style from './Home.module.css'
import DisplayProducts from '../DisplayProducts/DisplayProducts'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'

export default function Home() {
  return (
    <>
        <div className='grid grid-cols-1 gap-5 overflow-hidden'>
          <MainSlider/>
          <CategorySlider/>
          <DisplayProducts/>
        </div>
    </>
  )
}
