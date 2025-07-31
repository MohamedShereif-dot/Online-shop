import React,{useEffect,useState} from 'react'
import Style from './Products.module.css'
import DisplayProducts from '../DisplayProducts/DisplayProducts'

export default function Products() {
  return (
    <>
    <div className='grid grid-cols-1 gap-5 overflow-hidden'>
        <DisplayProducts/>
    </div>
    </>
  )
}
