import React, { useState } from 'react';
import { auth } from '../Firebase';
import { TextField, Button } from '@material-ui/core';
import './Signin.css';
const Signup = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const { email, password } = data;

    const change = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const signup = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password).then(res => {

        })
            .catch(err => {

                setError(err.message)

                setTimeout(() => {
                    setError('')
                }, 5000)
            })

    }

    return (
        <div className="login-form-start">
            {error ? (<p>{error}</p>) : (<p></p>)}
            <h5 style={{ textAlign: 'center' }}>This is Signup page</h5>
            <br />
            <form onSubmit={signup}>
                <div className="login-form">

                    <TextField type="text" name="email" value={email} onChange={change} variant="outlined" label="emailId" size="small" required />
                    <br />
                    <TextField name="password" type="password" value={password} onChange={change} variant="outlined" label="password" size="small" required />
                    <br />
                    <Button variant="contained" color="primary" size="large" type="submit" >Sign up</Button>
                </div>
            </form>



        </div>
    );
}

export default Signup;
