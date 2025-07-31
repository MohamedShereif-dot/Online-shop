import React,{useContext, useEffect,useState} from 'react'
import style from './ProtectedRoutes.module.css'
import { AuthContext } from '../AuthContextProvider/AuthContextProvider'
import { Navigate } from 'react-router-dom';

export default function ProtectedRoutes({children}) {
  const {userToken} = useContext(AuthContext);
  if(userToken){
    return children
  }else{
    return <Navigate to={'/login'} />
  }

}
