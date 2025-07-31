import React,{useEffect,useState} from 'react'
import style from './CategorySlider.module.css'
import Slider from 'react-slick';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';




export default function CategorySlider() {

  function  getCategories(){
     return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }
  
  let { data, isLoading, isError } = useQuery({
    queryKey:['getCategories'],
    queryFn:getCategories
  })

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  if(isLoading){
    return <div className='flex justify-center items-center h-[80vh] w-[90vw]'>
          <Oval
            height={80}
            width={80}
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel='oval-loading'
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
          </div>
  }

  return (
    <>
        <Slider {...settings} className='w-full'>
      {data?.data?.data?.map((category)=><div key={category._id}>
          <img src={category.image} alt={category.name} className = 'w-100 h-[250px] object-cover' />
        </div>
      )}
    </Slider>
    </>
  )
}
