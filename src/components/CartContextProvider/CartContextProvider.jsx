import React,{createContext, useContext, useEffect,useState} from 'react'
import style from './CartContextProvider.module.css'
import axios from 'axios';
import { AuthContext } from '../AuthContextProvider/AuthContextProvider';
import { API_ENDPOINTS, APP_CONFIG } from '../../constants/api';

export let cartContext=createContext();

export default function CartContextProvider({children}) {
  const {userToken}=useContext(AuthContext);

  const [cartId,setCartId] = useState(null)
  const [cartOwner,setCartOwner] = useState(null)
  const [products,setProducts] = useState({})
  const [numOfProducts,setNumOfProducts] = useState(0)
  const [totalPrice,setTotalPrice] = useState(0)

  async function addToCart(productId){
    return axios.post(API_ENDPOINTS.CART, {productId}, {
      headers: { token: userToken }
    }).then((res) => {
      if(res.data.status === "success"){
        setNumOfProducts(res.data.numOfCartItems);
        return true
      } else {
        return false
      }
    }).catch(() => {
      return false
    })
  }

  async function getCart(){
    return axios.get(API_ENDPOINTS.CART, {
      headers: { token: userToken }
    }).then((res) => {
      if(res){
        setProducts(res.data.data.products);
        setNumOfProducts(res.data.numOfCartItems);
        setTotalPrice(res.data.data.totalCartPrice);     
        setCartId(res.data.data._id);
        setCartOwner(res.data.data.cartOwner);
      }
    }).catch(() => {
      // Handle cart fetch error silently
    })
  }

  async function deleteCartItem(productId){
    return await axios.delete(API_ENDPOINTS.CART_ITEM(productId), {
      headers: { token: userToken }
    }).then((res) => {
      if(res.data.status === "success"){
        setProducts(res.data.data.products);
        setNumOfProducts(res.data.numOfCartItems);
        setTotalPrice(res.data.data.totalCartPrice);   
        return true;
      } else {
        return false;
      }
    }).catch(() => {
      return false;
    })
  }

  async function updateCartItemQuantity(productId, count){
    return await axios.put(API_ENDPOINTS.CART_ITEM(productId), {count}, {
      headers: { token: userToken }
    }).then((res) => {
      if(res.data.status === "success"){
        setProducts(res.data.data.products);
        setNumOfProducts(res.data.numOfCartItems);
        setTotalPrice(res.data.data.totalCartPrice);   
        return true;
      } else {
        return false;
      }
    }).catch(() => {
      return false;
    })
  }

  async function clearCartItems(){
    return await axios.delete(API_ENDPOINTS.CART, {
      headers: { token: userToken }
    }).then((res) => {
      if(res.data.message === "success"){
        setProducts([]);
        setNumOfProducts(0);
        setTotalPrice(0);   
        return true;
      } else {
        return false;
      }
    }).catch(() => {
      return false;
    })
  }

  return <cartContext.Provider value={{addToCart,getCart,products,numOfProducts,totalPrice,cartId,deleteCartItem,updateCartItemQuantity,clearCartItems ,setNumOfProducts,cartOwner,setCartOwner}} >
    {children}
  </cartContext.Provider>
}
