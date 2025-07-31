import React,{useContext, useEffect,useState} from 'react'
import Style from './Cart.module.css'
import { cartContext } from '../CartContextProvider/CartContextProvider'
import toast from 'react-hot-toast'
import { NavLink } from 'react-router-dom'



export default function Cart() {
  const {getCart,products,numOfProducts,totalPrice,deleteCartItem,updateCartItemQuantity,clearCartItems} = useContext(cartContext)
  
  useEffect(()=>{
    getCart();
  },[])

  async function deleteItem(id){
    let flag = await deleteCartItem(id);
    if(flag){
      console.log(flag);
      
        toast.success("Product deleted successfuly");
    }
    else{
        toast.error("An unexpected error occurred");

    }
  }

  async function updateCart(id,count){
    let flag = await updateCartItemQuantity(id,count);
    if(flag){
      console.log(flag);
      
        toast.success("Product Updated successfuly");
    }
    else{
        toast.error("An unexpected error occurred");

    }
  }

  async function clearCart(){
    let flag = await clearCartItems();
    if(flag){
      console.log(flag);
      
        toast.success("cart cleared successfuly");
    }
    else{
        console.log(flag);
        toast.error("An unexpected error occurred");

    }
  }
  
  return (
    <>
        <div className='parent w-full gap-3 m-auto bg-gray-50 p-15'>

          <div className="head flex justify-between items-center">
            <h1 className='text-3xl font-medium'>Cart Shop</h1>
            <button type="button" className="text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 rounded-lg text-xl px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"><NavLink to={'/payment'}>Check out</NavLink></button>
          </div>

          <div className="flex justify-between items-center my-7  text-xl font-medium">
            <div className="totalPrice ">total price: <span className='text-green-500'>{totalPrice}</span></div>
            <div className="numOfProducts">Number of products: <span className='text-green-500'>{numOfProducts}</span></div>
          </div>
          
          {products && products.length > 0 ? 
          <div className='text-center'>
            {products.map((product)=><div key={product._id} className='flex justify-between items-center p-3 border-b-2 border-gray-300 gap-5 sm:flex-col md:flex-row'>
                    <img src={product.product.imageCover} alt={product.product.title} className='sm:w-full md:w-[20%]'/>
                  
                    <div className='flex justify-between w-full'>
                      <div className='flex flex-col gap-2 justify-center items-start h-full'>
                      <h2 className='text-xl font-medium'>{product.product.title}</h2>
                      <span className='font-medium'>{product.price} EGP</span>
                      <button onClick={()=>{deleteItem(product.product.id);}} className=' text-red-600 cursor-pointer text-sm'><i className='fa fa-trash'></i> Remove</button>
                    </div>

                    <div className="flex items-center">
                          <button  onClick={()=>{updateCart(product.product._id,product.count-1)}}
                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg 
                              className="w-3 h-3" 
                              aria-hidden="true" 
                              xmlns="http://www.w3.org/2000/svg" 
                              fill="none" 
                              viewBox="0 0 18 2"
                            >
                              <path 
                                stroke="currentColor" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d="M1 1h16"
                              />
                            </svg>
                          </button>

                          <div>
                            <input 
                              type="number" 
                              id="first_product" 
                              className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                              placeholder={`${product.count}`} 
                              required 
                            />
                          </div>
                          <button  onClick={()=>{updateCart(product.product._id,product.count+1)}}
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" 
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg 
                              className="w-3 h-3" 
                              aria-hidden="true" 
                              xmlns="http://www.w3.org/2000/svg" 
                              fill="none" 
                              viewBox="0 0 18 18"
                            >
                              <path 
                                stroke="currentColor" 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth="2" 
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </button>
                    </div>
                        
                  </div>
                  
                </div>

              )}

              <button onClick={clearCart} type="button" className=" mt-10 cursor-pointer text-green-500 hover:text-white border border-green-500 hover:bg-green-500 focus:ring-4 focus:outline-none focus:ring-green-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-500 dark:focus:ring-green-500">Clear</button>

          </div>
          :null}


        </div>
    </>
  )
}
