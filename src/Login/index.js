import React, { useState } from 'react';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage, ] = useState("");
    
    const handleSubmit = (event) =>{
        
        event.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }  ,
            body: JSON.stringify({email, password})
        };
        fetch("http://5.22.217.225:8081/api/v1/auth/login", requestOptions)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            if(data.data.token){
                window.location.href = "./profile";
                sessionStorage.setItem("token", data.data.token);
            } else{
                setErrorMessage("Invalid email or password");
            }
        })
        .catch((error) =>{
            console.error(error)
            setErrorMessage("An error occurred while login ")
        })
    };
    
    return (
        <div className="d-flex justify-content-center align-items-center" style={{color: "#593D3B", fontSize: "25px"}}>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" value={email} onChange={(event)=> setEmail(event.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(event)=> setPassword(event.target.value)} />
          </label>
          <br />
          <button type="submit" style={{color: "Black", fontSize: "25px", borderColor: "#C3A995", borderRadius:"50%"}}>Submit</button>
          <div>{errorMessage && <p>{errorMessage}</p>}</div>
        </form>
        </div>
      );
}
export default Login;