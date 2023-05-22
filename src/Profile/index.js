import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";


const Profile = () => {
    const [profileData, setProfileData] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const token = sessionStorage.getItem("token");
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setErrorMessage] = useState(null);

    useEffect(() => {
        const request = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
            },
        };
        fetch(`http://5.22.217.225:8081/api/v1/user/profile`, request)
            .then((response) => response.json())
            .then((data) => {
                setIsLoaded(true);
                setProfileData(data.data);
            })
            .catch((error) => {
                setIsLoaded(true);
                console.error(error);
            });
    }, []);

    const updateProfile = (event) => {
       
        event.preventDefault();

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
        fetch("http://5.22.217.225:8081/api/v1/user/profile", requestOptions)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.data.token) {
              event.setName(data.data);
              event.setEmail(data.data);

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
            <div>
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
export default Profile;