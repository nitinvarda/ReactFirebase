import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { auth } from '../Firebase';
import { TextField, Button } from '@material-ui/core';
const Signin = () => {
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [isAuthenticated, setIsAuthenticated] = useState({
        loggedIn: false,
        error: ''
    })
    const { loggedIn, error } = isAuthenticated
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                setIsAuthenticated({
                    ...isAuthenticated,
                    loggedIn: true
                })
            }
        })
    }, [isAuthenticated])
    const { email, password } = data;

    const change = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const login = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then(res => {
            setIsAuthenticated({
                ...isAuthenticated,
                loggedIn: true
            })
        }).catch(err => {

            setIsAuthenticated({
                ...isAuthenticated,
                error: err.message
            })

            setTimeout(() => {
                setIsAuthenticated({
                    ...isAuthenticated,
                    error: ''
                })
            }, 5000)

        })

    }



    if (loggedIn) {
        return (
            <Redirect to="/" />
        )
    }
    return (
        <div style={{ width: "50%", margin: "auto" }}>
            {error ? (<p>{error}</p>) : (<p></p>)}
            <h5 style={{ textAlign: 'center' }}>This is Login page</h5>
            <br />
            <form onSubmit={login}>
                <div className="d-flex flex-column justify-content-around" style={{ width: "30%", margin: "auto" }}>

                    <TextField type="text" name="email" value={email} onChange={change} variant="outlined" label="emailId" size="small" required />
                    <br />
                    <TextField name="password" type="password" value={password} onChange={change} variant="outlined" label="password" size="small" required />
                    <br />
                    <Button variant="contained" color="primary" size="large" type="submit" >Login</Button>
                </div>


            </form>



        </div>
    );
}

export default Signin;
