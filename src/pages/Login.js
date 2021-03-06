import React, { Component } from 'react'
import axios from 'axios'
import md5 from 'md5'
import { Link } from 'react-router-dom'

class Login extends Component {
	constructor(){
		super()

		this.state = {
			login_data: [],
			username: '',
			password: '',
			login_data_satu: [],
			logged_in: false
		}

	}

	logOut = () => {
		this.setState({
			logged_in: false,
			login_data_satu: [],
			username: '',
			password: ''
		})
	}

	formSubmit = (event) => {
		//alert('Username :'+this.state.username+' | Password : '+this.state.password)
		this.doLogin();
		event.preventDefault()
	}

	changeValue = (event) => {
		const target = event.target
		const value = target.value
		const name = target.name
		this.setState({
			[name]: value
		})
	}

	async doLogin(){

		try {
		const username = this.state.username
		const password = this.state.password
		const url = 'http://localhost:3001/api/logins?filter={"where" : {"username" :"'+username+'", "password": "'+md5(password)+'" }}'
		const response = await axios(url);
    	const json = await Promise.all([response.data]);
    	if(json[0].length > 0){
    		this.setState({ 
    		login_data_satu: json[0][0],
    		logged_in: true
    		 });
    	} else {
    		this.setState({ 
    		login_data_satu: {username:'Username atau Password anda Salah'},
    		password: '',
    		logged_in: false
    		 });
    	}
    	
		} catch (error) {
			console.log(error)
		}

		
	}

	render(){

		
		const username = this.state.username;
		const password = this.state.password
		const data_satu = this.state.login_data_satu
		//console.log(items);

	

		if(this.state.logged_in===true){
			return (<div> Selamat datang, {data_satu.username}, <a href="#" onClick={this.logOut} >Logout</a> </div> )
		} else {

		return (
			<div>
			
			
			 <div className="container-fluid">
    <div className="container">
        <div className="row">
            <div className="col-sm-12">

                <div className="login-register-form">

                    <div className="form-holder">
                       	
                        <div className="form-row form-links">
                        <font className="text-danger">{data_satu.username} </font>
                            <div className="col-xs-12">
                            <Link to="/login" className="link-to active">Login</Link> or <Link to="/register" className="link-to">Register</Link>
                                
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
                                <div className="col-xs-6">
                                    <a href="#" className="forget-link">Forget your password?</a>
                                </div>
                                <div className="col-xs-6">
                                    <div className="submit-holder">
                                        <button type="submit">Login</button>
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


			</div>
		)
		}
	}
}

export default Login