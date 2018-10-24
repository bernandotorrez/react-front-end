import React, { Component } from 'react'
import axios from 'axios'
import md5 from 'md5'

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

		const items = this.state.login_data;
		const username = this.state.username;
		const password = this.state.password
		const data_satu = this.state.login_data_satu
		//console.log(items);

	

		if(this.state.logged_in===true){
			return (<div> Selamat datang, {data_satu.username}, <a href="#" onClick={this.logOut} >Logout</a> </div> )
		} else {

		return (
			<div>
			
			
			<h3><font color="red" id="tampil">{data_satu.username}</font></h3>
			

			{/*<form onSubmit={this.formSubmit}>

			<p><label>Username : </label>
			<input type="text" name="username" placeholder="Username" value={username} onChange={this.changeValue}/>
			</p>
 
			<p><label>Password : </label>
			<input type="password" name="password" placeholder="Password" value={password} onChange={this.changeValue} />
			</p>

			<p><button type="submit" value="Login" >Login</button></p>
		
			</form>*/}
			 <div className="container">
            <div className="row">
                
                  <div className="row">
    <form className="col s12" onSubmit={this.formSubmit}>
      <div className="row">
        <div className="input-field col s6">
          <i className="material-icons prefix">account_circle</i>
          <input id="icon_prefix" type="text" value={this.state.username} name="username" className="validate" onChange={this.changeValue}/>
          <label htmlFor="icon_prefix">Username</label>
        </div>
        <div className="input-field col s6">
          <i className="material-icons prefix">lock</i>
          <input id="icon_telephone" value={this.state.password} name="password" type="password" className="validate" onChange={this.changeValue}/>
          <label htmlFor="icon_telephone">Password</label>
        </div>
         <div className="input-field col s6">
         
          <button type="submit" value="Login" className="btn">Login</button>
         
        </div>
      </div>
    </form>
  </div>

                        </div>

                        </div>


			</div>
		)
		}
	}
}

export default Login