import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

const FilterSidebar = () => {
  const [searParams, setSearchParams] = useSearchParams()
  const [filters, setFiters] = useState({
    category:'',
    gender:"",
    color:"",
    size:[],
    material:[],
    brand:[],
    minPrice:0,
    maxPrice:100
  })
  const [priceRange, setPriceRange] = useState([0, 100])
  const colors=['red', 'blue', 'black', 'green', 'yellow', 'gray', 'white', 'pink', 'beige', 'navy']
  const sizes=['XS', 'S', 'M', 'L', 'XL', 'XXL']
  const materials=['Cotton', 'wool', 'Polyester', 'Silk', 'Linen','Viscose', 'Fleece', 'Denim',]
  const brands = ['Urban Threads', 'Modern Fit', 'Street style', 'Beach Breeze', 'Fashionista', 'ChicStyle']
 const genders = ["Men", 'Women']

 useEffect(() => {
  const params = Object.fromEntries([...searParams]);
  
  setFiters({
    category:params.category || '',
    gender:params.gender || '',
    color:params.color || '',
    size:params.size ? params.size.split(',') : [],
    material:params.material ? params.material.split(',') : [],
    brand:params.brand ? params.brand.split(',') : [],
    minPrice:params.minPrice || 0,
    maxPrice:params.maxPrice || 100,
  })
  setPriceRange([0, params.maxPrice || 100])
 }, [searParams]);



  return (
    <div>
      FilterSidebar
    </div>
  )
}

export default FilterSidebar
