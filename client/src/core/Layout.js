import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { isUser, isSignedIn, isAdmin } from '../auth/isAuth'
import { signout } from '../auth/helpers'

const activeLink = (history, path) => {
    if(history.location.pathname === path){
        return {color: '#ffd700'}
    }
    else{
        return {color: '#fff'}
    }
}

const Layout = ({children,history}) => {
    const nav = () => (
        <ul className='nav nav-tabs bg-dark'>
            <li className="nav-item">
                <Link className='nav-link' style={activeLink(history,'/')} to="/" >Home</Link>
            </li>
            {isSignedIn() ? (
                <Fragment>
                    {isAdmin() && (
                        <li className="nav-item">
                        <Link className='nav-link' style={activeLink(history,'/admin')} to="/admin" >Admin</Link>
                    </li>
                    )}
                    <li className="nav-item">
                        <Link className='nav-link' style={activeLink(history,'/users/logout')} to='#' onClick={() => {
                            signout(() => {
                                history.push('/')
                            })
                        }}>Logout</Link>
                    </li>
                </Fragment>
            ):
            (<Fragment>
                <li className="nav-item">
                    <Link className='nav-link' style={activeLink(history,'/users/register')} to="/users/register" >Register</Link>
                </li>
                <li className="nav-item">
                    <Link className='nav-link' style={activeLink(history,'/users/login')} to="/users/login" >Login</Link>
                </li>
            </Fragment>)
            }
        </ul>
    )
    return(
        <Fragment>
            {nav()}
            <div className="container">{children}</div>
        </Fragment>
    )
}

export default withRouter(Layout)