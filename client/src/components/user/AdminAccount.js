import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { getCookie, signout, updateAuth } from '../../auth/helpers'

import axios from '../../config/axios'
import 'react-toastify/dist/ReactToastify.min.css'
import Layout from '../../core/Layout'

const AdminAccount = () => {
    const history = useHistory()
    const [state,setState] = useState({
        role: "",
        username: "",
        email: "",
        password: "",
        buttonText: "Update"
    })

    const loadUser = async() => {
        try{
            let user = await axios.get('/users/account',{
                headers: {
                    'x-auth': getCookie('token')
                }
            })
            const {username,role,email} = user.data
            setState({
                ...state,
                username,role,email
            })
        }
        catch(err){
            console.log(err)
            if(err.request){
                toast.error('Session Expired, please login again')
                setTimeout(() => {
                    signout(()=>{
                        history.push('/users/login')
                    })
                },3000)
            }
        }
    }

    useEffect(()=>{
        loadUser()
    },[])

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]:e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setState({...state,buttonText:'Updating'})
        const { username, password } = state
        const fd ={
            username, password
        }
        console.log(fd)
        axios.put(`/admin/account/update`,fd,{
            headers: {
                'x-auth': getCookie('token')
            }
        })
            .then(response => {
                console.log(response.data)
                if(response.data.ok == true){
                    updateAuth(response, () => {
                        const { username } = response.data.user
                        setState({
                            ...state,
                            username,
                            password,
                            buttonText: 'Update'
                        })
                        toast.success('Updated Successfully')
                    })
                }
                else if(response.data.ok == false){
                    toast.error(response.data.msg)
                    setState({
                        ...state,
                        buttonText: "Update"
                    })
                }
            })
            .catch(err =>{
                console.log(err)
                if(err.request){
                    toast.error(err.response.data.msg)
                    setState({
                        ...state,
                        buttonText: "Update"
                    })
                }
            })
    }

    const updateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label className='text-muted'>Role</label>
                <input className='form-control' type='text' name='role' defaultValue={state.role} readOnly/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Username</label>
                <input className='form-control' type='text' name='username' value={state.username} onChange={handleChange} />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input className='form-control' type='email' name='email' defaultValue={state.email} readOnly/>
            </div>
            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input className='form-control' type='text' name='password' value={state.password} onChange={handleChange}/>
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
                <h1 className='text-center p-5'>User Account</h1>
                {updateForm()}
            </div>
        </Layout>
    )
}
export default AdminAccount