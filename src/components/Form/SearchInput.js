import React from 'react'
import { useSearch } from '../context/search'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SearchInput = () => {
    const [values,setValues] = useSearch();
     const navigate = useNavigate();


    const handleSubmit = async (e)=>{
        e.preventDefault();
       try {
        if(!values.keyword){
          values.results=[];
          navigate('/search');return;}
        const {data} = await axios.get(`https://shopifi.onrender.com/api/v1/product/search/${values.keyword}`)
        setValues({...values,results:data,keyword:""})
        navigate('/search')
       } catch (error) {
         console.log(error)
       }
    }
  return (
    <div>
        <form className="d-flex me-3" role="search" onSubmit={handleSubmit}>
  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" 
  value={values?.keyword} onChange={(e)=>setValues({...values,keyword:e.target.value})}/>
  <button className="btn btn-outline-dark" type="submit">Search</button>
</form>

    </div>
  )
}

export default SearchInput