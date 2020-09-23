import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from '../../config/axios'
import 'react-toastify/dist/ReactToastify.min.css'
import Layout from '../../core/Layout'

const Register = () => {
    const [state,setState] = useState({
        username: "Christina Agnes",
        password: "secret123",
        email: "christinaagnes95@gmail.com",
        buttonText: "Register"
    })

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]:e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setState({...state,buttonText:'Registering'})
        const {username,password,email} = state
        const fd ={
            username,password,email
        }
        console.log(fd)
        axios.post(`/users/register`,fd)
            .then(response => {
                console.log(response)
                if(response.data.ok == true){
                    toast.success(response.data.msg)
                    setState({
                        username: "",
                        password: "",
                        email: "",
                        buttonText: "Registered"
                    })
                }
                else if(response.data.ok == false){
                    toast.error(response.data.msg)
                    setState({
                        ...state,
                        buttonText: "Register"
                    })
                }
            })
            .catch(err =>{
                console.log(err)
                if(err.request){
                    toast.error(err.response.data.msg)
                    setState({
                        ...state,
                        buttonText: "Register"
                    })
                }
            })
    }

    const registerForm = () => (
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label className='text-muted'>Username</label>
                <input className='form-control' type='text' name='username' value={state.username} onChange={handleChange}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input className='form-control' type='email' name='email' value={state.email} onChange={handleChange}/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input className='form-control' type='password' name='password' value={state.password} onChange={handleChange}/>
            </div>
            <div>
                <button className='btn btn-primary' type='submit'>{state.buttonText}</button>
            </div>
        </form>
    )
    return (
        <Layout>
            <div className='col-md-6 offset-3'>
                <ToastContainer/>
                <h1 className='text-center p-5'>Register</h1>
                {registerForm()}
            </div>
        </Layout>
    )
}

export default Register