import React from 'react'
import axios from '../config/axios'
import { GoogleLogin } from 'react-google-login'


const Google = ({ passSignInData }) => {
    const responseGoogle = (response) => {
        console.log(response.tokenId)
        axios.post(`${process.env.REACT_APP_SERVER}/users/login/google`,{ idToken: response.tokenId })
            .then(res => {
                console.log('success google login',res)
                passSignInData(res)
            })
            .catch(err =>{
                console.log('err google login')
            })
    }

    return(
        <div className='pb-3 mt-1'>
            <GoogleLogin
                clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                buttonText="Sign in with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                render={renderProps => (
                    <button className='btn btn-lg btn-block btn-danger' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        <i className="fab fa-google pr-3"></i>
                        Login with google
                        </button>
                )}
            />
        </div>
    )
}

export default Google