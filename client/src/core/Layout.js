import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'

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
            <li className="nav-item">
                <Link className='nav-link' style={activeLink(history,'/users/register')} to="/users/register" >Register</Link>
            </li>
            <li className="nav-item">
                <Link className='nav-link' style={activeLink(history,'/users/login')} to="/users/login" >Login</Link>
            </li>
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