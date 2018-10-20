import React, { Component } from 'react'
import Menu from './components/Menu'
import axios from 'axios'

function tes() {
	alert('tesa');
	return false;
}

class Login extends Component {
	constructor(){
		super()

		this.state = {
			login_data: [],
			is_loaded: false,
			username: '',
			password: '',
			is_submit: false,
			login_data_satu: []
		}

	}

	buttonClick = () => {
		console.log('clicked')
		//$('#tampil').html('login');
	}

	formSubmit = (event) => {
		//alert('Username :'+this.state.username+' | Password : '+this.state.password)
		const username = this.state.username
		const url = 'http://localhost:3001/api/logins/'+username+'/Anggota'
		axios.get(url)
      .then(res => {
      	

      		const is_submit = true
      		const login_data_satu = res.data
      		this.setState({is_submit, login_data_satu})
      	
      	
        //console.log(res);
        console.log(res.data);
      }).catch(error => {
      	const is_submit = false
      		const login_data_satu = 'Not Found'
      		this.setState({is_submit, login_data_satu})
      	console.log(error)
      })
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

	componentDidMount(){
		const url = 'http://localhost:3001/api/logins'
		axios.get(url)
      .then(res => {
        const login_data = res.data;
        const is_loaded = true;
        this.setState({ login_data, is_loaded });
      })
	}

	render(){

		const items = this.state.login_data;
		const is_loaded = this.state.is_loaded;
		const username = this.state.username;
		const password = this.state.password
		const is_submit = this.state.is_submit
		const data_satu = this.state.login_data_satu
		//console.log(items);

	

		if(is_loaded==false){
			return (<div> loading ... </div> )
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