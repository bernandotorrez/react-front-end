import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import md5 from 'md5'
import axios from 'axios'

class Register extends Component {

	constructor(){
		super()
		this.state = {
			username: '',
			password: '',
			msg: ''
		}
	}

	changeValue = (event) => {
		const target = event.target
		const value = target.value
		const name = target.name
		this.setState({
			[name]: value
		})
	}

	formSubmit = (event) => {
		this.doRegister()
		
		event.preventDefault()
	}


	async doRegister(){

		try {
		const username = this.state.username
		const password = this.state.password
		const url = 'http://localhost:3001/api/logins'
		const response = await axios.post(url, {
					 "username": username, 
					   "level": "Admin", 
					   "login_time": "2018-10-24T15:55:12.662Z",  
					   "register_time": "2018-10-24T15:55:12.662Z", 
					   "status": "1", 
					   "verifikasi": "1", 
					   "passkey": md5(password),  
					   "password": md5(password) 
				})
    	const json = await Promise.all([response.data]);
    	if(json.length > 0){
    		this.setState({ 
    		
    		msg: 'Register Berhasil'
    		 });
    	} else {
    		this.setState({ 
    		msg: 'Register Gagal'
    		 });
    	}

    	console.log(json)
    	console.log(json.length)
    	
		} catch (error) {
			console.log(error)
			console.log(error.error)
			console.log(error.message)
		}

		
	}

	render(){
		return(
			<div className="container-fluid">
    <div className="container">
        <div className="row">
            <div className="col-md-12">
                <div className="login-register-form">
                    <div className="form-holder">
                        <font className="text-success">{this.state.msg}</font>
                        <div className="form-row form-links">
                            <div className="col-xs-12">
                             <Link to="/login" className="link-to">Login</Link> or <Link to="/register" className="link-to active">Register</Link>
                            </div>
                        </div>
                        <form onSubmit={this.formSubmit}>
                            <div className="form-row">
                                <div className="col-xs-12">
                                    <label>Username</label>
                                    <input type="text" name="username" onChange={this.changeValue} className="form-control" required/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-xs-12">
                                    <label>Password</label>
                                    <input type="password" name="password" onChange={this.changeValue} className="form-control" required/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-xs-12">
                                    <label>Repeat password</label>
                                    <input type="password" className="form-control" required/>
                                </div>
                            </div>
                           
                            <div className="form-row">
                                <div className="col-xs-12">
                                    <div className="submit-holder">
                                        <button type="submit">Register</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

		)
	}
}

export default Register