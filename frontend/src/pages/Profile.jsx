import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {

  const { userId } = useParams()
  const [userProfile, setUserProfile] = useState({})

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.post("http://localhost:3000/customer/spprofile", { userId }, { withCredentials: true })
        setUserProfile(response.data.profile)
      } catch (error) {
        console.log(error)
      }
    }
    fetchProfile()
  }, [])

  return (
    <div>
      <div className='profile'>
        <div className="ouContainer">
        <div className="uContainer">
          <img src='https://images.deepai.org/art-image/0c1e181b254f43a687c16c851a167973/blank-profile-picture-cffa10.jpg'  alt='Login'className='pImage'/>
          <div className="nameAndPhone">
            <h1>Name: <span className='bold'>{userProfile.name}</span></h1>
            <h1>Pincode: <span className='bold'>{userProfile.pincode}</span></h1>
          </div>
        </div>
        <div className="dContainer">
          <h1>Email: {userProfile.email}</h1>
          <h1>Phone: {userProfile.phone}</h1>
          <h1>Service type: {userProfile.serviceType}</h1>
        </div>
        </div>
        
        {
          userProfile.serviceType === "bloodDonor"
          &&
          (<h1>Blood Type:{userProfile.bloodType}</h1>)
        }
        {
          userProfile.serviceType === "rent"
          &&
          (<h1>Blood Type:{userProfile.vehicleType}</h1>)
        }
      </div>
    </div>
  )
}

export default Profile 