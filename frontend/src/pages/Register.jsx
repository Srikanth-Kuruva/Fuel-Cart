import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Register = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("")
    const [pincode, setPincode] = useState("")
    const [accountType, setAccountType] = useState("")
    const [serviceType, setServiceType] = useState("")
    const [vehicleType, setVehicleType] = useState("")
    const [bloodType, setBloodType] = useState("")
    
    const navigate = useNavigate()
    
    const handleRegister = async (e) =>{
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/user/register", {name, email, phone, password, address, pincode, accountType, serviceType, vehicleType, bloodType}, {withCredentials: true})
            if(response.data.success) {
                toast.success(response.data.message)
                if(accountType === "customer"){
                    return navigate("/customerhome")
                }
                return navigate("/sphome")
            }
            navigate("/")
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

  return (
    <div className='outerContainer'>
        <div className="register">
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
            <div className="input-field">
                <input type='text' name='name' value={name} placeholder='Enter name' onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className="input-field">
                <input type='email' name='email' value={email} placeholder='Enter Email' onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="input-field">
                <input type='number' name='phone' value={phone} placeholder='Enter phone' onChange={(e)=>setPhone(e.target.value)}/>
            </div>
            <div className="input-field">
                <input type='password' name='password' value={password} placeholder='Enter password' onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className="input-field">
                <textarea name="address" placeholder='Enter address' value={address} onChange={(e)=>setAddress(e.target.value)}/>
            </div>
            <div className="input-field">
                <input type='number' name='pincode' value={pincode} placeholder='Enter pincode' onChange={(e)=>setPincode(e.target.value)}/>
            </div>
            <div className="input-field">
                <select name="accountType" value={accountType} onChange={(e)=>setAccountType(e.target.value)} >
                    <option value="">Select account type</option>
                    <option value="customer">Customer</option>
                    <option value="serviceProvider">Service provider</option>
                </select>
            </div>

            {
                accountType === "serviceProvider"
                ?
            <div className="input-field">
                <select name="serviceType" value={serviceType} onChange={(e)=>setServiceType(e.target.value)} >
                    <option value="">Select service type</option>
                    <option value="petrol">Petrol Provider</option>
                    <option value="mechanic">Mechanic</option>
                    <option value="driver">Driver</option>
                    <option value="rent">Rent</option>
                    <option value="bloodDonor">Blood Donor</option>
                    <option value="helpLine">Help line</option>
                </select>
            </div>
            :
            <></>
            }

            {
                accountType==="serviceProvider" && serviceType ==="rent"
                ?
                <div className="input-field">
                    <select name="vehicleType" value={vehicleType} onChange={(e)=>setVehicleType(e.target.value)}>
                        <option value="">Select vehicle type</option>
                        <option value="twoWheeler">Two wheeler</option>
                        <option value="threeWheeler">Three wheeler</option>
                        <option value="fourWheeler">Four wheeler</option>
                    </select>
                </div>
                :
                <></>
            }

            {
                accountType==="serviceProvider" && serviceType ==="bloodDonor"
                ?
                <div className="input-field">
                    <select name="bloodType" value={bloodType} onChange={(e)=>setBloodType(e.target.value)}>
                        <option value="">Select Blood type</option>
                        <option value="O-">O-</option>
                        <option value="O+">O+</option>
                        <option value="A-">A-</option>
                        <option value="A+">A+</option>
                        <option value="B-">B-</option>
                        <option value="B+">B+</option>
                        <option value="AB-">AB-</option>
                        <option value="AB+">AB+</option>
                    </select>
                </div>
                :
                <></>
            }
            <input type="submit" value="Register" className='registerbtn'/>
        </form>
      </div>
    </div>
  )
}

export default Register