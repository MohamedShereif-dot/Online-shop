import React,{createContext, useContext, useEffect,useState} from 'react'
import style from './CartContextProvider.module.css'
import axios from 'axios';
import { AuthContext } from '../AuthContextProvider/AuthContextProvider';

export let cartContext=createContext();

export default function CartContextProvider({children}) {
  const {userToken}=useContext(AuthContext);

  const [cartId,setCartId] = useState(null)
  const [cartOwner,setCartOwner] = useState(null)
  const [products,setProducts] = useState({})
  const [numOfProducts,setNumOfProducts] = useState(0)
  const [totalPrice,setTotalPrice] = useState(0)

  async function addToCart(productId){
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart',{productId},{
      headers:{token:userToken}
    }).then((res)=>{
      console.log(res);
      if(res.data.status === "success"){
        setNumOfProducts(res.data.numOfCartItems);
        return true
      } else {
        return false
      }
      
    }).catch((error)=>{
        return false
    })

  }

  async function getCart(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart',{
      headers:{
        token:userToken
      }
    }).then((res)=>{
      if(res){
        console.log(res);
        setProducts(res.data.data.products);
        setNumOfProducts(res.data.numOfCartItems);
        setTotalPrice(res.data.data.totalCartPrice);     
        setCartId(res.data.data._id)   
        setCartOwner(res.data.data.cartOwner);
        console.log("Cart ID:", res.data.data._id);
        
      }
    }).catch((error)=>{
      console.log("Token:", userToken);
      
        console.log('error.. ',error);

    })
  }

  async function deleteCartItem(productId){
    return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
      headers:{
        token:userToken
      }
    }).then((res)=>{
      console.log(res);
      console.log(productId);
      if(res.data.status === "success"){
        console.log("Product deleted successfully");
        console.log(res.data.numOfCartItems);
        
          setProducts(res.data.data.products);
          setNumOfProducts(res.data.numOfCartItems);
          setTotalPrice(res.data.data.totalCartPrice);   
        return true;
      } else {
        return false;
      }
    }).catch((error)=>{
      console.log('error.. ',error);
      return false;
    })
  }

  async function updateCartItemQuantity(productId,count){
    return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count},{
      headers:{
        token:userToken
      }
    }).then((res)=>{
      console.log(res);
      if(res.data.status === "success"){
        setProducts(res.data.data.products);
        setNumOfProducts(res.data.numOfCartItems);
        setTotalPrice(res.data.data.totalCartPrice);   
        return true;
      } else {
        return false;
      }
    }).catch((error)=>{
      console.log('error.. ',error);
      return false;
    })

  }

  async function clearCartItems(){
    return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
      headers:{
        token:userToken
      }
    }).then((res)=>{
      console.log(res);
      if(res.data.message === "success"){
        setProducts([]);
        setNumOfProducts(0);
        setTotalPrice(0);   
        return true;
      } else {
        return false;
      }
    }).catch((error)=>{
      console.log('error.. ',error);
      return false;
    })

  }

  return <cartContext.Provider value={{addToCart,getCart,products,numOfProducts,totalPrice,cartId,deleteCartItem,updateCartItemQuantity,clearCartItems ,setNumOfProducts,cartOwner,setCartOwner}} >
    {children}
  </cartContext.Provider>
}
