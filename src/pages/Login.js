import React, { Component } from 'react'
import axios from 'axios'
import md5 from 'md5'

class Login extends Component {
	constructor(){
		super()

		this.state = {
			login_data: [],
			is_loaded: false,
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

	async getData() {
		try {

      	const response = await fetch(`http://localhost:3001/api/logins`);
    	const json = await response.json();
    	this.setState({ 
    		login_data: json,
    		is_loaded: true
    		 });

		} catch (error) {
			console.log(error)
		}
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

	componentDidMount(){
		this.getData()
	}

	render(){

		const items = this.state.login_data;
		const is_loaded = this.state.is_loaded;
		const username = this.state.username;
		const password = this.state.password
		const data_satu = this.state.login_data_satu
		//console.log(items);

	

		if(is_loaded===false){
			return (<div> loading ... </div> )
		} if(this.state.logged_in===true){
			return (<div> Selamat datang, {data_satu.username}, <a href="#" onClick={this.logOut} >Logout</a> </div> )
		} else {

		return (
			<div>
			
			<h1 className="text-center"> Silahkan Login </h1>

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
                <div className="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
			<form className="form" method="post" id="login-form" novalidate="novalidate" wtx-context="72B58FA7-2F39-452C-9030-40A648CABF0D">
                            <div className="header header-success text-center">
                                <h4 className="card-title">Sign in</h4>
                                <div className="social-line">

                                </div>
                          </div>
                          
                            <div className="card-content">

                                
                                <div className="input-group">
                                    <span className="input-group-addon">
                                        <i className="material-icons">email</i>
                                    </span>
                                    <div className="form-group"><input type="text" id="email" name="email" className="form-control" placeholder="Email..." minlength="10" maxlength="100" wtx-context="3B8B3636-644C-43D6-AA24-889EDA2C3E70" aria-invalid="false"/><span className="material-input"></span></div>
                                    <span className="help-block" id="error"></span>
                                </div>
   
                            </div>
                            <div className="footer text-center">
                                <button type="submit" className="btn btn-success btn-lg" name="btn-login" id="btn-login">Sign In</button>
                                 <br/>Belum Punya Akun?<a href="https://jujitsu-upn.online/register" className="btn btn-success btn-simple btn-wd btn-lg">Sign Up<div className="ripple-container"></div></a>
                                 <br/>Lupa Password?<a href="https://jujitsu-upn.online/reset" className="btn btn-success btn-simple btn-wd btn-lg">Reset Password<div className="ripple-container"></div></a>
                            </div>
                        </form>

                        </div>

                        </div>

                        </div>

			 <ul>
          {items.map(item => (
            <li key={item.username}>
              {item.username} {item.level}
            </li>
          ))}
        </ul>

			</div>
		)
		}
	}
}

export default Login