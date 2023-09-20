import {useState,useContext,useEffect,createContext} from 'react'
import { useAuth } from './auth';

const CartContext = createContext();



const CartProvider = ({children})=>{
    const [cart,setCart] = useState([]);
    const [auth,setAuth] = useAuth();
    

    useEffect(()=>{
        const data = auth?.token
        if(data){
            let userid = auth?.user?._id;
            let existingCartItem = localStorage.getItem(userid);
            if(existingCartItem)
            setCart(JSON.parse(existingCartItem))
        }else
        {
            setCart([])
        }
    },[auth])

    return(
        <CartContext.Provider value={[cart,setCart]}>
            {children}
        </CartContext.Provider>
    )
}

//custom hook
const useCart = ()=>{
    return useContext(CartContext);
}

export {useCart,CartProvider};