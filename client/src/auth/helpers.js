import cookie from 'js-cookie'

export const setCookie = (key,value) => {
    if(window !== 'undefined'){
        return cookie.set(key,value,{
            expires: 1
        })
    }
}

export const removeCookie = (key) => {
    if(window !== 'undefined'){
        return cookie.remove(key)
    }
}

export const getCookie = (key) => {
    if(window !== 'undefined'){
        return cookie.get(key)
    }
}

export const setLocalStorage = (key,value) => {
    if(window !== 'undefined'){
        return localStorage.setItem(key,JSON.stringify(value))
    }
}

export const removeLocalStorage = (key) => {
    if(window !== 'undefined'){
        return localStorage.removeItem(key)
    }
}

export const authenticate = (response,next) => {
    console.log('authenticate response middleware',response)
    setCookie('token',response.data.token)
    setLocalStorage('user',response.data.user)
    next()
}

export const updateAuth = (response,next) => {
    console.log('update Auth response middleware',response)
    setLocalStorage('user',response.data.user)
    next()
}

export const signout = (next) => {
    console.log('signout middleware')
    removeCookie('token')
    removeLocalStorage('user')
    // window.location.href ='/'
    next()
}