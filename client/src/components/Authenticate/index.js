import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'


const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
       
        !localStorage.getItem('usertoken')
            ? <Redirect to="/login"/>
            : <Component {...props}/>

        
    )}/>
)

export default PrivateRoute;