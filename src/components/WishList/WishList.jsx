import React, { useContext } from 'react';
import { wishListContext } from '../WishListContext/WishListContext';
import { cartContext } from '../CartContextProvider/CartContextProvider';
import toast from 'react-hot-toast';

export default function WishList() {
  const { wishList, removeFromWishlist } = useContext(wishListContext);
    let { addToCart} = useContext(cartContext);

  const handleRemoveFromWishlist = (wishlistItemId) => {
    removeFromWishlist(wishlistItemId);
  };


    async function addToCartAlert(id) {
    let alert = await addToCart(id);
    if (alert) {
      toast.success("Product added successfully");
    } else {
      toast.error("An unexpected error occurred");
    }
  }


  return (
    <>
      <div className="parent w-full gap-3 m-auto bg-gray-50 p-8 rounded-lg shadow-lg">
        <h2 className='text-3xl font-medium mb-6 text-gray-800'>My Wishlist</h2>

        {wishList && wishList.length === 0 ? (
          <div className='bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative text-center' role="alert">
            <span className="block sm:inline">Your wishlist is empty.</span>
          </div>
        ) : (
          <div className='text-center'>
            {wishList && wishList.map((item) => (
              <div key={item._id} className='flex flex-col sm:flex-row justify-between items-center p-4 my-3 border-b-2 border-gray-200 last:border-b-0 rounded-md bg-white shadow-sm'>
                <img
                  src={item.imageCover}
                  alt={item.title}
                  className='w-full sm:w-1/5 md:w-[150px] h-auto object-cover rounded-md mb-4 sm:mb-0 sm:mr-4'
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/150x150/E0E0E0/333333?text=No+Image'; }}
                />

                <div className='flex flex-col sm:flex-row justify-between w-full items-center'>
                  <div className='flex flex-col gap-2 justify-center items-start h-full text-left'>
                    <h2 className='text-xl font-semibold text-gray-900'>{item.title}</h2>
                    <span className='font-medium text-green-600'>{item.price} EGP</span>
                    <button
                      onClick={() => { handleRemoveFromWishlist(item._id); }}
                      className='text-red-600 cursor-pointer text-sm hover:underline flex items-center mt-2'
                    >
                      <i className='fa fa-trash mr-1'></i> Remove
                    </button>
                  </div>
                </div>
                
                  <button 
                type='submit' 
                onClick={() => { addToCartAlert(item._id) }} 
                className='cursor-pointer border-2 relative bottom-[-30%] group-hover:bottom-0 border-green-500 hover:bg-green-500 hover:text-white transition-all duration-400 w-full py-2 rounded-xl mt-3'
              >
                Add to cart
              </button>
              </div>

            ))}
          </div>
        )}
      </div>
    </>
  );
}