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
                    console.log(snapshot.docs.map(doc => doc))
                    console.log(snapshot.docs.map(doc => ({ id: doc.id, todo: doc.data().todo })))
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
        db.collection(user).add({
            todo: todo,
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString(),
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setTodo('')

    }

    const del = (e) => {

        db.collection(user).doc(e.currentTarget.parentElement.getAttribute('data-id')).delete()
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
                <div className="welcome">
                    <div>
                        <h5>Welcome ,  {user}</h5>
                    </div>
                    <Button className="logout-btn" variant="contained" size="small" color="secondary" onClick={logout}>Logout</Button>
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
                            <React.Fragment key={todo.id}>
                                <li className="todo-body" data-id={todo.id} >
                                    <h5 style={{ width: '50%' }}>{todo.todo}</h5>
                                    {/* <button className="btn btn-danger del-btn" onClick={del} >delete</button> */}
                                    <Button className="del-btn" variant="contained" size="small" color="secondary" onClick={del} >Delete</Button>

                                </li>
                                <hr />
                            </React.Fragment>
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
