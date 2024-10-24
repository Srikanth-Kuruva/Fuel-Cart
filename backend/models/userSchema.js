import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"],
        minLength: [3, "Name should contain minimum 3 characters"],
        maxLength: [20, "Name cannot exceed 20 characters"]
    },
    email:{
        type: String,
        required: [true, "Email is required"],
    },
    password:{
        type:String,
        required: [true, "Password is required"],
    },
    pincode:{
        type: Number,
        required: [true, "Pincode is required"]
    },
    phone:{
        type:Number,
        required: [true, "Phone is required"],
    },
    address:{
        type: String,
        required: [true, "Address is required"],
        minLength: [10, "Address should contain minimum 10 characters"],
        maxLength: [50, "Address can contain maximum 50 characters"]
    },
    accountType:{
        type:String,
        required: [true, "Account type is required"],
        enum:["customer", "serviceProvider"]
    },
    serviceType:{
        type: String,
        enum:["petrol", "mechanic", "driver", "bloodDonor", "rent", "helpLine"]
    },
    vehicleType:{
        type: String,
        enum:["twoWheeler", "threeWheeler", "fourWheeler"]
    },
    bloodType:{
        type:String,
        enum:["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"]
    }
})

const User = mongoose.model("User", userSchema);

export default User;