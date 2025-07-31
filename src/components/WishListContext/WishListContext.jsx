import toast from 'react-hot-toast';
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const wishListContext = createContext();

export default function WishListContext({ children }) {
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('userToken')) {
      getWishList();
    }
  }, []);

  async function getWishList() {
    try {
      const res = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: { token: localStorage.getItem('userToken') }
      });
      if (res.data.status === "success") {
        setWishList(res.data.data);
        console.log("Wishlist fetched successfully:", res.data.data);
      }
    } catch (error) {
      console.error("Error getting wishlist:", error);
    }
  }

async function addToWishlist(productId) {
    try {
        const res = await axios.post(
            'https://ecommerce.routemisr.com/api/v1/wishlist',
            { productId },
            { headers: { token: localStorage.getItem('userToken') } }
        );

        if (res.data.status === "success") {
            toast.success("Product added to wishlist");
            await getWishList();
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error adding to wishlist:", error);
        toast.error(error.response?.data?.message || "Please login to add to wishlist");
        return false;
    }
}

  function isInWishlist(productId) {
    return wishList.some(item => item._id === productId || item.id === productId);
  }

  async function removeFromWishlist(productId) {
    try {
      const res = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers: { token: localStorage.getItem('userToken') } }
      );
      
      if (res.data.status === "success") {
        setWishList(prev => prev.filter(item => item._id !== productId));
        toast.success("Product removed from wishlist");
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error(error.response?.data?.message || "Failed to remove from wishlist");
    }
  }

  return (
    <wishListContext.Provider value={{ wishList, isInWishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </wishListContext.Provider>
  );
}