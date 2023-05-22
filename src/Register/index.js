import React, { useState } from 'react';


const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [errorMessage, setErrorMessage,] = useState("");

    const handleSubmit = (event) => {

        event.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        };
        fetch("http://5.22.217.225:8081/api/v1/auth/register", requestOptions)
            .then((response) => {
                console.log("aqui1")
                return response.json()
            })
            .then((data) => {
                if (data.data.token) {
                    sessionStorage.setItem("token", data.data.token);
                    window.location.href = "http://5.22.217.225:8081/api/v1/user/profile"

                } else {
                    setErrorMessage("Invalid email or password");
                }
            })
            .catch((error) => {
                console.error(error)
                setErrorMessage("An error occurred while login ")
            })
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ color: "#593D3B", fontSize: "25px" }}>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </label>
                <br />
                <button type="submit" style={{ color: "Black", fontSize: "25px", borderColor: "#C3A995", borderRadius: "50%" }}>Submit</button>
                <div>{errorMessage && <p>{errorMessage}</p>}</div>
            </form>
        </div>
    );
}
export default Register;