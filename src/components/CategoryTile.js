import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';

export default function CategoryTile({categoryName}) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
  
  
    const subjectURL = `https://www.googleapis.com/books/v1/volumes?q=${categoryName}&maxResults=6&filter=paid-ebooks`
    async function fetchBooks(){
      const response= await fetch(subjectURL);
      const data = await response.json();
      setProducts(data.items);
      console.log(data); //Needed to be removed later
      setLoading(false);
    }
      useEffect(()=>{
        fetchBooks()
      },[])
  return (
    <div>
        <p className='text-center font-bold mt-5 text-xl'>{categoryName}</p>
        <div className='flex flex-wrap justify-center mt-1'>
          { loading? <Loader/> : products.map((item)=> {
          return(
          <ProductCard key={item.id} product={item}/>
          )
         })}
        </div>
    </div>
  )
}
