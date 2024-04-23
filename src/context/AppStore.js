import React, { useEffect, useState } from 'react'
import { AppContext } from './AppContext'
export default function AppStore({children}) {

  const [cartItems , setCartItems] = useState([])



  const [cartTotal,setCartTotal] = useState(0);
 

  return (
    <AppContext.Provider value={{cartItems,setCartItems,cartTotal,setCartTotal}}>
        {children}
    </AppContext.Provider>
  )
}
