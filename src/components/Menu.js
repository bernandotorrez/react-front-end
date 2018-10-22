import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from '../pages/Home'
import Login from '../pages/Login'
import About from '../pages/About'

const Menu = () => (
	 <Router>
    <div>
      <ul>
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

      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} />
    </div>
  </Router>
);

export default Menu