import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Loader from '../Loader';
export default function Register() {
    let [loading, setLoding] = useState(false)
    const navigate = useNavigate()
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Confirm, setConfirm] = useState("")
    const handleSubmit = async (e) => {

        e.preventDefault();
        if (Email == "" || Password == "" || Confirm == "") {
            alert("fill all the fields")
        }
        else if (Password != Confirm) {
            alert("passwords do not match")
        }
        else {
            setLoding(true)
            const response = await axios.post("https://vcsystem.onrender.com/user/register", { Email, Password })
            console.log(response)
            console.log("clicked2")
            const data = await response.data

            setLoding(false)
            if (data == "already exists") {
                setLoding(false)
                alert("User with this email already exists")
            }
            else {
                setLoding(false)
                alert("Account created successfully plz login")
                navigate("/", { replace: true });

            }
        }
        setEmail('')
        setPassword('')
        setConfirm('')
    }

    return (

        <>
            {loading ? (<Loader />) : (
                <div className="container" >
                    <div className="row justify-content-center">
                        <div className="col-lg-7">
                            <div className="card shadow-lg border-0 rounded-lg mt-5">
                                <div className="card-header"><h3 className="text-center font-weight-light my-4">Create Account</h3></div>
                                <div className="card-body">
                                    <form onSubmit={handleSubmit}>

                                        <div className="form-floating mb-3">
                                            <input className="form-control" id="inputEmail" value={Email} type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
                                            <label for="inputEmail">Email address</label>
                                        </div>
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3 mb-md-0">
                                                    <input className="form-control" id="inputPassword" value={Password} type="password" placeholder="Create a password" onChange={(e) => setPassword(e.target.value)} />
                                                    <label for="inputPassword">Password</label>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-floating mb-3 mb-md-0">
                                                    <input className="form-control" id="inputPasswordConfirm" value={Confirm} type="password" placeholder="Confirm password" onChange={(e) => setConfirm(e.target.value)} />
                                                    <label for="inputPasswordConfirm">Confirm Password</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 mb-0">
                                            <div className="d-grid"> <button type='Submit' className="btn btn-primary btn-block" >Create Account</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>

    )

}