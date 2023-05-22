import React, { useEffect, useState } from "react";

const UpdateProfile = () => {
    const [profileData, setProfileData] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const token = sessionStorage.getItem("token");
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setErrorMessage] = useState(null);


    const updateProfile = (id) => {
        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            name,
            email
          }),
        };
        fetch(`http://5.22.217.225:8081/api/v1/user/profile/${id}`, requestOptions)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.data.token) {
              setName(data.data);
              setEmail(data.data);

            } else {
              setErrorMessage("Invalid");
            }
          })
          .catch((error) => {
            console.error(error);
            setErrorMessage("An error occurred while updating profile");
          });
    
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else if (profileData) {
        return (

            <div className="d-flex justify-content-center align-items-center" style={{color: "#593D3B", fontSize: "25px"}}>
            <form onSubmit={updateProfile}>
              <label>
                Name:
                <input type="text" value={email} onChange={(event)=> setName(event.target.value)} />
              </label>
            
              <br />
              <label>
                Email:
                <input type="text" value={email} onChange={(event)=> setEmail(event.target.value)} />
              </label>
            
              <br />
              <button type="submit" style={{color: "Black", fontSize: "25px", borderColor: "#C3A995", borderRadius:"50%"}}>Submit</button>
              
            </form>



                <img src={profileData.profile_picture} alt={profileData.name} />
                <h1> {profileData.name} </h1>
                <p1> {profileData.email}</p1>
                <br/>
                <button type="button" style={{ color: "Black", fontSize: "25px", borderColor: "#C3A995", backgroundColor: "#E9B44C" }} onClick={() => updateProfile()}>
                    Update Profile
                </button>
               

            </div>
        );
    }
}

export default UpdateProfile;