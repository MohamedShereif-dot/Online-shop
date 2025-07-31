import React,{useEffect,useState} from 'react'
import Style from './NotFoundPage.module.css'
import error from '../../assets/error.svg'

export default function NotFoundPage() {
  return (
    <>
      <img src={error} className="w-[60vw] m-auto" alt="error" />
        
    </>
  )
}
