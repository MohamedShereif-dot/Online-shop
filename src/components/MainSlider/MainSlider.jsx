import React,{useEffect,useState} from 'react'
import style from './MainSlider.module.css'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import Slider from 'react-slick';
import first from '../../assets/first.jpg'
import second from '../../assets/second.jpg'
import third from '../../assets/third.jpg'
import fourth from '../../assets/fourth.jpg'

export default function MainSlider() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return (
    <>
      <div className={`${style.sliderContainer} flex max-w-[50%] m-auto`}>
        <Slider {...settings} className='w-[50%]'>
          
            <div key={0}>
              <img src={third} alt={`Slide ${0}`} className='w-full object-cover' />
            </div>
            <div key={1}>
              <img src={fourth} alt={`Slide ${1}`} className='w-full object-cover' />
            </div>
        
        </Slider>
          
          <div className='w-[50%]'>
            <div key={2}>
              <img src={first} alt={`Slide ${2}`} className='w-full object-cover' />
            </div>
            <div key={3}>
              <img src={second} alt={`Slide ${3}`} className='w-full object-cover' />
            </div>
          </div>
      
      </div>
    </>
  )
}
