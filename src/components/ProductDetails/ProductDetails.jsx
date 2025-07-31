import React,{useContext, useState} from 'react'
import style from './ProductDetails.module.css'
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import { getProducts } from '../DisplayProducts/DisplayProducts';
import { Link } from 'react-router-dom';
import { cartContext } from '../CartContextProvider/CartContextProvider';
import toast from 'react-hot-toast';


export default function ProductDetails() {
    let { addToCart } = useContext(cartContext);

  const {id}= useParams();
  
  function fetchProductDetails(id) {
    console.log(id);
    
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }
  
  
  
  const { data, isLoading,isFetching, isError } = useQuery({
    queryKey: ['productDetails', id],
    queryFn: () => fetchProductDetails(id)
  });
  
  let {data: productsData, isLoading: productsIsLoading, isFetching: productsIsFetching, isError: productsIsError} = useQuery({
    queryKey:["Products"],
    queryFn:getProducts
  })
  
    async function addToCartAlert(id) {
    let alert = await addToCart(id);
    if (alert) {
      toast.success("Product added successfully");
    } else {
      toast.error("An unexpected error occurred");
    }
  }

  if(isLoading || productsIsLoading){
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

  if (isError) {
    return <h2>Product not found</h2>;
  }


  const product = data?.data?.data;

  return (
    <>

    <div className='flex flex-col'>
{product ? (
        <div className='grid md:grid-cols-[1fr_2fr] sm:grid-cols-1 items-center gap-7 mx-10'>
          <div className="md:">
            <img src={product.imageCover} alt={product.title} />
          </div>

          <div className="second">
            <h2 className='text-[27px] font-medium my-2'>{product.title}</h2>
          <p className='mb-4'>{product.description}</p>
          <div className='flex justify-between'>
            {product.priceAfterDiscount?<><p className='line-through text-red-600'>{product.price} EGP</p><p>{product.priceAfterDiscount} EGP</p></>:<p>{product.price} EGP</p>} 
            <p><i className='fa-solid fa-star text-yellow-500'></i>{product.ratingsAverage}</p>
          </div>

              <span className='flex flex-col items-center'>
        <button onClick={() => { addToCartAlert(product._id) }}  className='cursor-pointer border-2 relative bottom-[-30%] group-hover:bottom-0 border-green-500 hover:bg-green-500 hover:text-white transition-all duration-400 w-3/4 py-2 rounded-xl mt-6'>+ Add</button>
              </span>
          </div>
        </div>
      ) : (
        <h2>Not found</h2>
      )}

      <div className='parent grid md:grid-cols-2 lg:grid-cols-4 gap-3'>
        {productsData?.data.data.map((product)=><div key={product._id} className='group p-5 relative overflow-hidden shadow-lg rounded-3xl'>
          <Link to={`/ProductDetails/${product._id}`}>
          <img src={product.imageCover} alt={product.title} />
          <h3 className='text-green-600 mb-4'>{product.category.name}</h3>
          <h2 className='font-medium mb-2'>{product.title.split(' ',2).join(" ")}</h2>
          
          <div className='flex justify-between'>
            {product.priceAfterDiscount?<><p className='line-through text-red-600'>{product.price} EGP</p><p>{product.priceAfterDiscount} EGP</p></>:<p>{product.price} EGP</p>} 
            <p><i className='fa-solid fa-star text-yellow-500'></i>{product.ratingsAverage}</p>

            {product.priceAfterDiscount?<span className="bg-red-100 text-red-800 text-xs top-0 font-medium me-2 absolute px-2.5 py-1 rounded-sm dark:bg-red-900 dark:text-red-300">Sale</span>:null}

          </div>
          </Link>

        <button 
              type='submit' 
              onClick={() => { addToCartAlert(product._id) }} 
              className='cursor-pointer border-2 relative bottom-[-30%] group-hover:bottom-0 border-green-500 hover:bg-green-500 hover:text-white transition-all duration-400 w-full py-2 rounded-xl mt-3'
            >
              Add to cart
            </button>
        </div>
          )}
        </div>
    </div>
      
    </>
  );
}
