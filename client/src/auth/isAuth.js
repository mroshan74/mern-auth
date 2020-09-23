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
