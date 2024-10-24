import mongoose from 'mongoose'

const connectDB = ()=>{
    mongoose.connect("mongodb://localhost:27017/fuelcart")
    .then(()=>console.log("Connected to database"))
    .catch((err)=>console.log("Error connecting to database"))
}

export default connectDB