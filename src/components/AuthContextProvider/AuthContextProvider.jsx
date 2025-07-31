import React,{createContext,useState} from 'react'
import style from './AuthContextProvider.module.css'

export let AuthContext = createContext();

export default function AuthContextProvider({children}) {

  const [userToken, setUserToken] = useState(null);

  

  return <AuthContext.Provider value={{userToken, setUserToken}}>
      {children}
        </AuthContext.Provider>

}
