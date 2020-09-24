import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './App'

import AdminRoute from './auth/AdminRoute'
import PrivateRoute from './auth/PrivateRoute'
import Account from './components/user/Account'

import Register from './components/user/Register'
import Activate from './components/user/Activate'
import Login from './components/user/Login'

import AdminPage from './components/test/AdminPage'
import PrivatePage from './components/test/PrivatePage'
import AdminAccount from './components/user/AdminAccount'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={App} />
            <Route exact path='/users/login' component={Login} />
            <Route exact path='/users/register' component={Register} />
            <Route exact path='/auth/activate/:encrypted' component={Activate} />
            <AdminRoute exact path='/admin' component={AdminPage} />
            <PrivateRoute exact path='/private' component={PrivatePage} />
            <PrivateRoute exact path='/users/account' component={Account} />
            <AdminRoute exact path='/admin/account' component={AdminAccount} />
        </Switch>
    </BrowserRouter>
)

export default Routes