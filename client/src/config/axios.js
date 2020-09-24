import Axios from 'axios'
// import { getCookie } from '../auth/helpers'

const URL = window.location.origin.includes('localhost') ? `http://localhost:5990/api` : "/api"
// console.log(process.env.REACT_APP_SERVER)
// console.log(getCookie('token'), 'getCookie')
const axios = Axios.create({
    baseURL: URL,
    // headers: {
    //     "x-auth": getCookie('token') && getCookie('token')
    // }
})

export default axios