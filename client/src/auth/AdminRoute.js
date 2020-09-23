import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isSignedIn, isAdmin } from './isAuth'

const AdminRoute = ({ component: Component, ...rest }) => {
    return (
        <Route 
            {...rest}
            render={props => 
                isSignedIn() && isAdmin() ? (
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

export default AdminRoute