import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Activate from './components/login-register/Activate'
import Login from './components/login-register/Login'
import Register from './components/login-register/Register'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={App} />
            <Route exact path='/users/login' component={Login} />
            <Route exact path='/users/register' component={Register} />
            <Route exact path='/auth/activate/:encrypted' component={Activate} />
        </Switch>
    </BrowserRouter>
)

export default Routes