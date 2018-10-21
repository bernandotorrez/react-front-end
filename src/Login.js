import React, { Component } from 'react'
import Menu from './components/Menu'
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

	changeUsername = (event) => {
		this.setState({
			username: event.target.value
		})
	}

	changePassword = (event) => {
		this.setState({
			password: event.target.value
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
		const url = 'http://localhost:3001/api/logins?filter={"where" : \
		{"no_hp" :"'+username+'", \
		"password": "'+md5(password)+'" }}'
		const response = await axios(url);
    	const json = await Promise.all([response.data]);
    	if(json[0].length > 0){
    		this.setState({ 
    		login_data_satu: json[0][0],
    		logged_in: true
    		 });
    	} else {
    		this.setState({ 
    		login_data_satu: {no_hp:'Salah'},
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

	

		if(is_loaded==false){
			return (<div> loading ... </div> )
		} if(this.state.logged_in==true){
			return (<div> Selamat datang, {data_satu.no_hp}, <a href="#" onClick={this.logOut} >Logout</a> </div> )
		} else {

		return (
			<div>
			<Menu/>
			<h1> Silahkan Login </h1>

			<h3><font color="red" id="tampil">{data_satu.no_hp} - {data_satu.nama_anggota} - {data_satu.id_anggota}</font></h3>
			

			<form onSubmit={this.formSubmit}>

			<p><label>Username : </label><input type="text" placeholder="Username" value={username} onChange={this.changeUsername}/></p>
 
			<p><label>Password : </label><input type="password" placeholder="Password" value={password} onChange={this.changePassword} /></p>

			<p><button type="submit" value="Login" >Login</button></p>
		
			</form>

			 <ul>
          {items.map(item => (
            <li key={item.no_hp}>
              {item.no_hp} {item.level}
            </li>
          ))}
        </ul>

			</div>
		)
		}
	}
}

export default Login