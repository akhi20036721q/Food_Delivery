import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import {toast} from "react-toastify"
const List = () => {

  const url = "http://localhost:4000"
  const [list, setList] = useState([]);


  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      //console.log(response.data); // Log the response data to see the structure
  
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
  const removeFood = async (foodId) => {
    try {
        const response = await axios.post(`${url}/api/food/remove`, { id: foodId });

        // Log the full response to inspect its structure
        console.log("Response data:", response.data);

        // After the removal, fetch the updated list of food items
        await fetchList();

        // Check the response for success
        if (response.data ) {
            // Show success toast in green
            toast.success(response.data.message);
        }
         else {
            // If the success value is false or not as expected, show error toast
            toast.error(response.data?.message || "Error: Something went wrong.");
        }
    } catch (error) {
        // Catch network or other errors
        console.error("Error removing food:", error);
        toast.error("An error occurred while removing the food item. Please try again.");
    }
};



  // const removeFood = async(foodId) => {
  //        const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
  //        await fetchList();
  //        if(response.data.success) {
  //         toast.success(response.data.message)
  //        }
  //        else{
  //         toast.error("Error")
  //        }
  // }
  useEffect(()=>{
    fetchList();

  }, []);
  console.log(list);

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item,index)=>{
            return(
              <div key={index} className='list-table-format'>
                <img src={`${url}/images/`+item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default List