import Axios from 'axios'

const URL = window.location.origin.includes('localhost') ? `http://localhost:5990/api` : "/api"
//console.log(process.env.REACT_APP_SERVER)
const axios = Axios.create({
    baseURL: URL,
    // headers: {
    //     "x-auth": JSON.parse(localStorage.getItem('authToken'))?.token
    // }
})

export default axios