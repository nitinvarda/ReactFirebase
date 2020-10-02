import React, { useState } from 'react';
import { auth } from '../Firebase';
import { TextField, Button } from '@material-ui/core';
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
        <div style={{ width: "50%", margin: "auto" }}>
            {error ? (<p>{error}</p>) : (<p></p>)}
            <h5 style={{ textAlign: 'center' }}>This is Signup page</h5>
            <br />
            <form onSubmit={signup}>
                <div className="d-flex flex-column justify-content-around" style={{ width: "30%", margin: "auto" }}>

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
