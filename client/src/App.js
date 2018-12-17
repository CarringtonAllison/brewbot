import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Profile from './components/Profile/Profile'
import SearchPage from "./Pages/SearchPage"
import AddBeers from "./Pages/addBeers"
import Scrape from "./Pages/articleScrape/index"
import PrivateRoute from "./components/Authenticate";
import { Provider } from 'react-redux';
import store from './state'

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <div className="fluid-container">
                            <Navbar />
                        </div>
                        {/* <Route exact path="/" component={Login} /> */}
                        <div className="container">
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/login" component={Login} />
                            <PrivateRoute exact path="/" component={Profile} />
                            <PrivateRoute exact path="/profile" component={Profile} />
                            <PrivateRoute exact path="/searchPage" component={SearchPage} />
                            <PrivateRoute exact path="/articles" component={Scrape} />
                            <PrivateRoute exact path="/addBeers" component={AddBeers} />
                        </div>
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default App;