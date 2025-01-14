import foodModel from "../models/foodModels.js";
import fs from 'fs';

//add food items

const addFood = async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image upload failed" });
    }
  
    const image_filename = req.file.filename;
  
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      image: image_filename,
    });
  
    try {
      await food.save();
      res.json({ success: true, message: "Food item added successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Error adding food item" });
    }
  };
  

//all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || "Error fetching foods" });
  }
};


//remove food item


const removeFood = async(req,res)=>{
    try {
        const food=await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({sucess:true,message:"food removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error})
    }
}

export {addFood,listFood,removeFood}