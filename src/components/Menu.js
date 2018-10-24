import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from '../pages/Home'
import Login from '../pages/Login'
import About from '../pages/About'

const Menu = () => (
	 <Router>
    <div>
     <nav className="light-blue lighten-1" role="navigation">
    <div className="nav-wrapper container"><a id="logo-container" href="#" className="brand-logo">Logo</a>
      <ul className="right hide-on-med-and-down">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>

         <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>

      <ul id="nav-mobile" className="sidenav">
         <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>

         <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
      <a href="#" data-target="nav-mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>
    </div>
  </nav>
      

      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} />
    </div>
  </Router>
);

export default Menu