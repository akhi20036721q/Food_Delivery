import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
const FoodDisplay = ({category}) => {

  const url = "http://localhost:4000"
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {

      const response = await axios.get(`${url}/api/food/list`);  
      
      if (response.data.success) {
      
        setList(response.data.data);  // Set food items
      
      } else {
      
        toast.error("No food items found.");
      
      }
    
    } catch (error) {
    
      console.error("Error fetching food list:", error);
    
      toast.error("Failed to fetch food items.");
    }
  };

  useEffect(()=>{
    fetchList();
  }, []);

  console.log(list);

    // const {food_list} = useContext(StoreContext)
  return (
    <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <div className="food-display-list">
            {list.map((item,index)=>{
              if(category==="All" || category===item.category){
                return <FoodItem  key={index} id={item.id} name={item.name} description={item.description} price={item.price} image={`${url}/images/`+item.image}/>

              }


                
            })}
        </div>

    </div>
  )
}

export default FoodDisplay