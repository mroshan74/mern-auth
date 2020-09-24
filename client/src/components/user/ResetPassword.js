import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import jwt from 'jsonwebtoken'
import { isSignedIn } from '../../auth/isAuth'

import axios from '../../config/axios'
import 'react-toastify/dist/ReactToastify.min.css'
import Layout from '../../core/Layout'

const Login = ({match}) => {
    const history = useHistory()
    const [state,setState] = useState({
        newPassword: "secret123",
        buttonText: 'Reset Password',
        username: "",
        token: ""
    })

    useEffect(() => {
        
    },[])

    useEffect(()=>{
        if(isSignedIn()){
            history.push('/')
        }
        else{
            const token = match.params.token
            const { username } = jwt.decode(token)
            setState({
                ...state,
                username,
                token
            }) 
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
        setState({...state,buttonText:'Resetting'})
        const {newPassword, token} = state
        const fd ={
            newPassword
        }
        console.log(fd)
        axios.put(`/auth/reset/${token}`,fd)
            .then(response => {
                console.log(response.data)
                if(response.data.ok == true){
                    toast.success(response.data.msg)
                    setState({
                        ...state,
                        newPassword: "",
                        buttonText: "Reset Password"
                    })
                    setTimeout(() => {
                        history.push('/users/login')
                    },2000)
                }
                else if(response.data.ok == false){
                    toast.error(response.data.msg)
                    setState({
                        ...state,
                        buttonText: "Reset Password"
                    })
                    setTimeout(() => {
                        history.push('/users/login')
                    },2000)
                }
            })
            .catch(err =>{
                console.log(err)
                if(err.request){
                    toast.error(err.response.data.msg)
                    setState({
                        ...state,
                        buttonText: "Reset Password"
                    })
                    setTimeout(() => {
                        history.push('/users/login')
                    },2000)
                }
            })
    }

    const resetForm = () => (
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input className='form-control' type='password' name='newPassword' value={state.newPassword} onChange={handleChange}/>
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
                <h1 className='text-center p-5'>Reset Password</h1>
                {resetForm()}
            </div>
        </Layout>
    )
}
export default Login