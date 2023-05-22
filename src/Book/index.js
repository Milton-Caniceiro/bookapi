import React, { useState, useEffect } from 'react';
import { Form, Button, Table, Modal } from 'react-bootstrap';


const Book = () => {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [description, setDescription] = useState("");
    const [book_cover, setBookCover] = useState("");
    const [id, setID] = useState("");
    const token = sessionStorage.getItem("token");
    //const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage,] = useState("");

    useEffect(() => {

        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        };

        fetch(`http://5.22.217.225:8081/api/v1/book/?sort_by=year&order_by=desc`, requestOptions)

            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    // setIsLoading(true);
                    setBooks(data.data)

                } else {
                    setErrorMessage("Invalid books");
                }
            })
            .catch((error) => {
                setErrorMessage("An error occurred")
            })
    }, []);


    const handleID = (id) => {

        const requestOptions = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
            }
        };
        fetch(`http://5.22.217.225:8081/api/v1/book/${id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setID(data.data);

                } else {

                    setErrorMessage("No book found with that ID");
                }
            })
            .catch((error) => {
                console.error(error);
                setID(null);
                setErrorMessage("An error occurred while searching for the book");
            });
    };

    const handleSubmitBook = (event) => {

        event.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`
            },
            body: JSON.stringify({
                title,
                year,
                description,
            })
        };
        fetch("http://5.22.217.225:8081/api/v1/book/", requestOptions)
            .then((response) => {
                console.log("aqui1")
                return response.json()
            })
            .then((data) => {
                if (data.status) {
                    setTitle("");
                    setYear("");
                    setDescription("");
                }

            })
            .catch((error) => {
                console.error(error)
                setErrorMessage("An error occurred while login ")
            })
    };


    const updateBook = (id) => {

        const requestOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`
            },
            body: {
                title: title,
                year: year,
                description: description

            }
        };
        fetch(`http://5.22.217.225:8081/api/v1/book/${id}`, requestOptions)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                if (data.status) {

                } else {
                    setErrorMessage("Invalid email or password");
                }
            })
            .catch((error) => {
                console.error(error)
                setErrorMessage("An error occurred while login ")
            })
    };

    const deleteBook = (id) => {
       
        const requestOptions = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`
            }
        };
        fetch(`http://5.22.217.225:8081/api/v1/book/${id}`, requestOptions)
            .then((response) => {
                console.log("aqui1")
                return response.json()
            })
            .then((data) => {
                if (data) {
                    console.log("Deleted Book");
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
        <div>
            <div className='books' style={{ color: "#6F5E53", fontSize: "70px" }} >- Books -</div>
            <div className='books' style={{ color: "#6F5E53", fontSize: "40px" }} >Find your book: </div>

            <div>
                <form onSubmit={handleID}>
                    <label>
                        ID:
                        <input type="number" value={id} onChange={(event) => setID(event.target.value)} />
                    </label>
                </form>
            </div>
            <br />
            <div className='books' style={{ color: "#6F5E53", fontSize: "40px" }}> Add a new book: </div>
            <form onSubmit={handleSubmitBook}>
                <label>
                    Title:
                    <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
                </label>
                <br />
                <label>
                    Year:
                    <input type="number" value={year} onChange={(event) => setYear(parseInt(event.target.value))} />
                </label>
                <br />
                <label>
                    Description:
                    <input type="text" value={description} onChange={(event) => setDescription(event.target.value)} />
                </label>
                <br />
                <button type="submit" style={{ color: "Black", fontSize: "25px", borderColor: "#C3A995", borderRadius: "50%" }}>Submit</button>
                <div>{errorMessage && <p>{errorMessage}</p>}</div>
            </form>

            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Description</th>
                        <th>Book Cover</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.year}</td>
                            <td>{book.description}</td>
                            <td><img
                                src={book.book_cover}
                                alt={book.title}
                                style={{ maxWidth: "100px", maxHeight: "100px" }} /></td>
                            <td>
                                <button type="button" style={{ color: "Black", fontSize: "25px", borderColor: "#C3A995", backgroundColor: "#E9B44C" }} onClick={() => updateBook(book.id)} >
                                    Update
                                </button>
                                <button type="button" style={{ color: "Black", fontSize: "25px", borderColor: "#C3A995", backgroundColor: "red" }} onClick={() => deleteBook(book.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>))}
                </tbody>
            </Table>
        </div>

    );
}
export default Book;