import axios from "axios";
import { createContext, useState } from "react";

export let wishlistContext=createContext();

export function WishlistContextProvider(props){
//   let [wishlistNumber,setWishlistNumber]=useState(0);
  let header={
   token:localStorage.getItem('userToken')
}
function addToWishlist(id){
     
    
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
    
    {
      productId:id
    },
    {
       headers:header
    }
    )
}
function getMyWishlist(){
  
  return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,  
  {
     headers:header
  }
  )
}
function deleteWishlist(id){
  
  return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, 
  {
     headers:header
  }
  )
}
 
return <wishlistContext.Provider value={{addToWishlist,getMyWishlist,deleteWishlist}}>
    {props.children}
</wishlistContext.Provider>
}