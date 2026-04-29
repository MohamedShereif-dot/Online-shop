import toast from 'react-hot-toast';
import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { API_ENDPOINTS, APP_CONFIG } from '../../constants/api';

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
      const res = await axios.get(API_ENDPOINTS.WISHLIST, {
        headers: { token: localStorage.getItem(APP_CONFIG.TOKEN_KEY) }
      });
      if (res.data.status === "success") {
        setWishList(res.data.data);
      }
    } catch (error) {
      // Handle wishlist fetch error silently
    }
  }

async function addToWishlist(productId) {
    try {
        const res = await axios.post(
            API_ENDPOINTS.WISHLIST,
            { productId },
            { headers: { token: localStorage.getItem(APP_CONFIG.TOKEN_KEY) } }
        );

        if (res.data.status === "success") {
            toast.success("Product added to wishlist");
            await getWishList();
            return true;
        }
        return false;
    } catch (error) {
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
        API_ENDPOINTS.WISHLIST_ITEM(productId),
        { headers: { token: localStorage.getItem(APP_CONFIG.TOKEN_KEY) } }
      );
      
      if (res.data.status === "success") {
        setWishList(prev => prev.filter(item => item._id !== productId));
        toast.success("Product removed from wishlist");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove from wishlist");
    }
  }

  return (
    <wishListContext.Provider value={{ wishList, isInWishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </wishListContext.Provider>
  );
}