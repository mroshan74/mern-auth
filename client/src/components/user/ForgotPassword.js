import React, { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { isSignedIn } from '../../auth/isAuth'

import axios from '../../config/axios'
import 'react-toastify/dist/ReactToastify.min.css'
import Layout from '../../core/Layout'

const Login = () => {
    const history = useHistory()
    const [state,setState] = useState({
        email: "christinaagnes95@gmail.com",
        buttonText: "Submit"
    })

    useEffect(() => {
        if(isSignedIn()){
            history.push('/')
        }
    },[])

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]:e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setState({...state,buttonText:'Submitting'})
        const {email} = state
        const fd ={
            email
        }
        console.log(fd)
        axios.put(`/users/account/reset`,fd)
            .then(response => {
                console.log(response.data)
                if(response.data.ok == true){
                    toast.success(response.data.msg)
                    setState({
                        email: "",
                        buttonText: "Submit"
                    })
                    setTimeout(() => {
                        history.push('/')
                    },2000)
                }
                else if(response.data.ok == false){
                    toast.error(response.data.msg)
                    setState({
                        ...state,
                        buttonText: "Submit"
                    })
                }
            })
            .catch(err =>{
                console.log(err)
                if(err.request){
                    toast.error(err.response.data.msg)
                    setState({
                        ...state,
                        buttonText: "Submit"
                    })
                }
            })
    }

    const resetForm = () => (
        <form onSubmit={handleSubmit}>
            <p>Enter the Registered email to send reset password link</p>
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input className='form-control' type='email' name='email' value={state.email} onChange={handleChange}/>
            </div>
            <div>
                <button className='btn btn-primary' type='submit' disabled={state.email.length > 0 ? false:true}>{state.buttonText}</button>
            </div>
        </form>
    )
    return (
        <Layout>
            <div className='col-md-6 offset-3'>
                <ToastContainer/>
                <h1 className='text-center p-5'>Forgot Password</h1>
                {resetForm()}
            </div>
        </Layout>
    )
}
export default Login