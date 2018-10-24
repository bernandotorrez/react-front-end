import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from '../pages/Home'
import Login from '../pages/Login'
import About from '../pages/About'
import Register from '../pages/Register'

const Menu = () => (
	 <Router>
    <div>
    <div id="header-holder">
      <nav id="nav" className="navbar navbar-full">
        <div className="container-fluid">
            <div className="container container-nav">
                <div className="row">
                    <div className="col-md-12">
                        <div className="navbar-header">
                            <button aria-expanded="false" type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link to="/" className="navbar-brand active"><font color="white">Connectify</font></Link>
                           
                        </div>
                        <div style={{ height: "1px" }} role="main" aria-expanded="false" className="navbar-collapse collapse navbar-collapse-centered" id="bs">
                            <ul className="nav navbar-nav navbar-nav-centered">
                                 
                                <li className="nav-item">
                                 <Link to="/" className="nav-link">Home</Link>
                                
                                </li>
                                
                                
                                <li className="nav-item">
                                <Link to="/about" className="nav-link">About</Link>
                                   
                                </li>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">Login</Link>
                                </li>
                               
                            </ul>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    </div>
      

      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </div>
  </Router>
);

export default Menu