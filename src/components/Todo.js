import React, { useState, useEffect } from 'react';
import { db, auth } from '../Firebase';
import { Link } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import firebase from 'firebase/app'
import './Todo.css';
const Todo = () => {
    const [todo, setTodo] = useState('')
    const [isAuthenticated, setIsAuthenticated] = useState({
        loggedIn: false,
        user: ''
    })
    const [todos, setTodos] = useState([])

    const { loggedIn, user } = isAuthenticated;
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {

                setIsAuthenticated({
                    loggedIn: true,
                    user: user.email
                })

                db.collection(user.email).orderBy("timestamp", "desc").onSnapshot(snapshot => {
                    // console.log(snapshot.docs.map(doc => doc))
                    // console.log(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo })))
                    setTodos(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo })))
                })

            }
        })
    }, [])


    const change = (e) => {
        setTodo(e.target.value)
    }
    const add = (e) => {
        e.preventDefault();
        db.collection(`${user}`).add({
            todo: todo,
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setTodo('')

    }
    const del = (e) => {
        db.collection(`${user}`).doc(e.target.id).delete()
    }
    const logout = (e) => {
        auth.signOut().then(res => {

            setIsAuthenticated({
                loggedIn: false,
                user: ''
            })
        })
    }
    if (loggedIn) {

        return (
            <div>
                <div className="d-flex justify-content-around">
                    <div>
                        <h3>Welcome ,  {user}</h3>
                    </div>
                    <Button variant="contained" size="small" color="secondary" onClick={logout}>Logout</Button>
                </div>
                <hr />
                <div className="add-todo">

                    <form onSubmit={add}>
                        <TextField autoComplete='off' type="text" name="todo" value={todo} onChange={change} variant="outlined" label="Add a todo" size="small" required />
                        &nbsp;
                        <Button type="submit" variant="contained" size="large" color="primary">Add</Button>

                    </form>

                </div>
                <hr />

                <div>
                    {todos.map((todo) => {
                        return (
                            <div key={todo.id} className="d-flex justify-content-around" style={{ width: "70%", margin: 'auto', marginBottom: 15 }}>
                                <h3 style={{ width: '50%' }}>{todo.todo}</h3>
                                <Button variant="contained" size="small" color="secondary" onClick={del} id={todo.id}>Delete</Button>

                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
    else {
        return (
            <div style={{ width: "50%", margin: 'auto', textAlign: 'center' }}>
                <h1>You are not Logged in</h1>

                <p>Already a user? Please <Link to="/login">Login</Link> or <Link to="/signup" >Signup</Link></p>

            </div>
        )
    }
}

export default Todo;
