import React, { useEffect, useState } from 'react';



const Profile = () =>  {
  const [profileData, setProfileData] = useState("");
//   const [isLoading, setIsLoading] = useState("");
  const token = sessionStorage.getItem("token");
  const [errorMessage, setErrorMessage, ] = useState("");
   
    useEffect(() =>{

        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,},
        };
        
        fetch(`http://5.22.217.225:8081/api/v1/user/profile`, requestOptions)
        
        .then((response) =>  response.json())
        .then((data) => {
            if(data){
                // setIsLoading(true);
                setProfileData(data.data)
    
            } else{
                setErrorMessage("Invalid profile");
            }
        })
        .catch((error) =>{
            setErrorMessage("An error occurred")
        })
    }, []);
    
    return (
       <div>
        <img src={profileData.profile_picture} alt= {profileData.name} style={{ maxWidth: "200px", maxHeight: "200px" }}/> 
        <p >{profileData.name}</p>
        <p >{profileData.email}</p>
        <button type="update" style={{color: "Black", fontSize: "25px", borderColor: "#C3A995", borderRadius:"50%"}}>Update Profile</button>
       </div>
      );}

export default Profile;