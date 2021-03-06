import React, { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { authenticate } from '../../auth/helpers'
import { isAdmin, isSignedIn } from '../../auth/isAuth'

import axios from '../../config/axios'
import 'react-toastify/dist/ReactToastify.min.css'
import Layout from '../../core/Layout'
import Google from '../../auth/Google'
import Facebook from '../../auth/Facebook'

const Login = () => {
    const history = useHistory()
    const [state,setState] = useState({
        email: "christinaagnes95@gmail.com",
        password: "secret123",
        buttonText: "Sign In"
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

    const passSignInData = (response) => {
        if(response.data.ok == true){
            authenticate(response,()=>{
                toast.success(response.data.msg)
                setTimeout(() => {
                    isAdmin() ? history.push('/admin/account') : history.push('/users/account')
                },1000)
            })
        }
        else if(response.data.ok == false){
            toast.error(response.data.msg)
        }
        else{
            toast.error('Login with Google Failed')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setState({...state,buttonText:'Logging In'})
        const {password,email} = state
        const fd ={
            password,email
        }
        console.log(fd)
        axios.post(`/users/login`,fd)
            .then(response => {
                console.log(response.data)
                if(response.data.ok == true){
                    authenticate(response,()=>{
                        toast.success(response.data.msg)
                        setState({
                            password: "",
                            email: "",
                            buttonText: "Signed In"
                        })
                        setTimeout(() => {
                            isAdmin() ? history.push('/admin/account') : history.push('/users/account')
                        },2000)
                    })
                }
                else if(response.data.ok == false){
                    toast.error(response.data.msg)
                    setState({
                        ...state,
                        buttonText: "Sign In"
                    })
                }
            })
            .catch(err =>{
                console.log(err)
                if(err.request){
                    toast.error(err.response.data.msg)
                    setState({
                        ...state,
                        buttonText: "Sign In"
                    })
                }
            })
    }

    const loginForm = () => (
        <form onSubmit={handleSubmit}>
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
                <h1 className='text-center p-5'>Login</h1>
                <Google passSignInData={passSignInData}/>
                <Facebook passSignInData={passSignInData}/>
                {loginForm()}
                <div className='text-primary mt-4'>
                    <Link to='/users/account/reset'>Forgot Password?</Link>
                </div>
            </div>
        </Layout>
    )
}
export default Login