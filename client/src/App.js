import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Landing from './components/Landing/Landing'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Profile from './components/Profile/Profile'
import SearchPage from "./Pages/SearchPage"
import Google from "./components/Google/SearchBox"
import Scrape from "./Pages/articleScrape/index"
import PrivateRoute from "./components/Authenticate"

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Navbar />
                    <Route exact path="/" component={Login} />
                    <div className="container">
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/searchPage" component={SearchPage} />
                        <Route exact path="/google" component={Google} />
                        <PrivateRoute exact path="/profile" component={Profile} />
                        <PrivateRoute exact path="/searchPage" component={SearchPage} />
                        <PrivateRoute exact path="/articles" component={Scrape} />
                    </div>
                </div>
            </Router>
        )
    }
}

export default App;