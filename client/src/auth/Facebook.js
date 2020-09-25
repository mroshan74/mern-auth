import React from 'react'
import axios from '../config/axios'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'


const Facebook = ({ passSignInData }) => {
    const responseFacebook = (response) => {
        console.log(response)
        axios.post(`${process.env.REACT_APP_SERVER}/users/login/facebook`,
            { 
                userID: response.userID,
                accessToken: response.accessToken
            })
            .then(res => {
                console.log('success facebook login',res)
                passSignInData(res)
            })
            .catch(err =>{
                console.log('err facebook login',err)
            })
    }

    return(
        <div className='pb-3 mt-2'>
            <FacebookLogin
                appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
                autoLoad={ false }
                callback={responseFacebook}
                render={renderProps => (
                    <button className='btn btn-lg btn-block btn-primary' onClick={renderProps.onClick}>
                        <i className="fab fa-facebook pr-3"></i>
                        Login with facebook
                    </button>
                )}
            />
        </div>
    )
}

export default Facebook