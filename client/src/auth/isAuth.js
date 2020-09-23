import { getCookie } from './helpers'

export const isUser = () => {
    if(window !== 'undefined'){
        const checkCookie = getCookie('token')
        if(checkCookie){
            let getUser = localStorage.getItem('user')
            return JSON.parse(getUser)
        }
        else {
            return false
        }
    }
}

export const isSignedIn = () => {
    if(typeof window == 'undefined'){
        return false
    }
    else{
        const checkCookie = getCookie('token')
        if(checkCookie){
            return true
        }
        else {
            return false
        }
    }
}

export const isAdmin = () => {
    if(typeof window == 'undefined'){
        return false
    }
    else {
        const checkCookie = getCookie('token')
        if(checkCookie){
            let getUser = JSON.parse(localStorage.getItem('user'))
            if(getUser.role === 'admin'){
                return true
            }
            else {
                return false
            }
        }
        else {
            return false
        }
    }
}