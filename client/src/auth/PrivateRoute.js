import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isSignedIn } from './isAuth'

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route 
            {...rest}
            render={props => 
                isSignedIn() ? (
                    <Component {...props}/>
                ) : (
                    <Redirect 
                        to={{
                            pathname: '/users/login',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    )
}

export default PrivateRoute