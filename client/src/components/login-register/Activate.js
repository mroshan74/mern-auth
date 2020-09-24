import React, { Fragment, useState, useEffect, useMemo } from 'react'
import { Link, Redirect } from 'react-router-dom'
import jwt from 'jsonwebtoken'
import { ToastContainer, toast } from 'react-toastify'
import axios from '../../config/axios'
import 'react-toastify/dist/ReactToastify.min.css'
import Layout from '../../core/Layout'

const Activate = (props) => {
    const [state,setState] = useState({
        username : "",
        token : "",
        show: false,
        redirect: false
    })
    // const {encrypted} = useParams()

    const {username,token,show,redirect} = state
    
    useEffect(()=>{
        const token = props.match.params.encrypted
        const { username } = jwt.decode(token)
        setState({
            ...state,
            username,
            token
        })     
    },[])

    useMemo(()=>{
        if(token){
            axios.post(`/auth/activate/${token}`)
                .then(response => {
                    if(response.data.ok==true){
                        toast.success(response.data.msg)
                        setTimeout(()=>{
                            setState({...state,show:true})
                        },4000)
                    }
                    else{
                        toast.error(response.data.msg)
                        setTimeout(()=>{
                            setState({...state,redirect:true})
                        },3000)
                    }
                })
                .catch(err =>{
                    if(err.request){
                        toast.error(err.response.data.msg)
                        setTimeout(()=>{
                            setState({...state,redirect:true})
                        },4000)
                    }
                })
        }
    },[token])

    console.log(state)

    return (
        <Layout>
            <div className='col-md-6 offset-3'>
                <ToastContainer/>
                <h1 className='text-center p-5'>Activating Account</h1>
                <p className='text-center p-2'>Hi <b>{username}</b>, we are processing your request.</p>
                {redirect && <Redirect to='/users/register'/>}
                {show && <Redirect to='/users/login'/>}
            </div>
        </Layout>
    )
}
export default Activate
