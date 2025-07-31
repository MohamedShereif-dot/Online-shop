import React, { useContext, useEffect, useState } from 'react';
import style from './DisplayProducts.module.css';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Oval } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { cartContext } from '../CartContextProvider/CartContextProvider';
import toast from 'react-hot-toast';
import Heart from "react-heart";
import { wishListContext } from '../WishListContext/WishListContext';

export async function getProducts() {
  return await axios.get('https://ecommerce.routemisr.com/api/v1/products');
}

export default function DisplayProducts() {
  let { addToCart, getCart } = useContext(cartContext);
  let { addToWishlist, isInWishlist, removeFromWishlist, wishList } = useContext(wishListContext);
  const [searchTerm, setSearchTerm] = useState('');
  
  let { data, error, isLoading, isFetching, isError } = useQuery({
    queryKey: ["Products"],
    queryFn: getProducts
  });
  
  useEffect(() => {
    console.log('Wishlist updated:', wishList);
  }, [wishList]);

  useEffect(() => {
    getCart();
  }, []);

  async function addToCartAlert(id) {
    let alert = await addToCart(id);
    if (alert) {
      toast.success("Product added successfully");
    } else {
      toast.error("An unexpected error occurred");
    }
  }

  const toggleWishlist = async (productId) => {
    if (await isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  const filteredProducts = data?.data.data.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    product.category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
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
    </div>;
  }

  if (isError) {
    return <div className='text-red-500 text-center'>Failed to load products.</div>;
  }

  if (data.data.data.length === 0) {
    return <div className='text-red-500 text-center'>No products available.</div>;
  }

  return (
    <>
      <div className='mb-6 mt-10 mx-4'>
        <input
          type="text"
          placeholder="Search products..."
          className='w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className='parent grid md:grid-cols-2 lg:grid-cols-4 gap-3'>
        {filteredProducts?.map((product) => (
          <div key={product._id} className='group p-5 relative overflow-hidden shadow-lg rounded-3xl'>
            <Link to={`/ProductDetails/${product._id}`}>
              <img src={product.imageCover} alt={product.title} />
              <h3 className='text-green-600 mb-4'>{product.category.name}</h3>
              <h2 className='font-medium mb-2'>{product.title.split(' ', 2).join(" ")}</h2>
              
              <div className='flex justify-between'>
                {product.priceAfterDiscount ? (
                  <>
                    <p className='line-through text-red-600'>{product.price} EGP</p>
                    <p>{product.priceAfterDiscount} EGP</p>
                  </>
                ) : <p>{product.price} EGP</p>} 
                <p><i className='fa-solid fa-star text-yellow-500'></i>{product.ratingsAverage}</p>

                {product.priceAfterDiscount ? (
                  <span className="bg-red-100 text-red-800 text-xs top-0 font-medium me-2 absolute px-2.5 py-1 rounded-sm dark:bg-red-900 dark:text-red-300">Sale</span>
                ) : null}
              </div>
            </Link>
            
            <div style={{ width: "2rem"}} className='ms-auto mt-2'>
              <Heart 
                isActive={isInWishlist(product._id)} 
                onClick={() => {
                  toggleWishlist(product._id);
                }}
                style={{ 
                  width: '24px',
                  cursor: 'pointer',
                  opacity: isInWishlist(product._id) ? 1 : 0.7
                }}
              />
            </div>
            
            <button 
              type='submit' 
              onClick={() => { addToCartAlert(product._id) }} 
              className='cursor-pointer border-2 relative bottom-[-30%] group-hover:bottom-0 border-green-500 hover:bg-green-500 hover:text-white transition-all duration-400 w-full py-2 rounded-xl mt-3'
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
}