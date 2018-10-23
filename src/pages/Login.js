import React, { Component } from 'react'

class Login extends Component {

	constructor(){
		super()
		this.state = {
			data_login: [],
			isLoaded: false,
			username: ''
		}
	}

	render(){
		return(
			<div>
			Login 

			<h1> Silahkan Login </h1>

			<p>
			<Form/>
			</p>

			<p> Data : </p>

			<ul>
			{ this.state.data_login.map(item => (
				<li key={item.no_hp}>
					{item.no_hp} - {item.level} - {item.login_time}
				</li>

				))
			}
			</ul>
			</div>
		)
	}

	async getData(){
		try {
		const res = await fetch('http://localhost:3001/api/logins')
		const json = await res.json()

		this.setState({
			data_login: json
		})

		} catch (error){
			console.log(error)
		}
	}

	componentDidMount(){
		this.getData()
	}
}

class Form extends Component {

	render(){
		return (
			<div>
			<form onSubmit={this.formSubmit}>
			<label>Username : &nbsp;
			<input type="text" name="username" placeholder="Username" maxLength="10" minLength="5"/>
			<p>
			<button value="Login"> Login </button>
			</p>
			</label>
			</form>
			</div>
		)
	}

	formSubmit = (e) => {
		alert('tes')
		e.preventDefault()
	}

	
}

export default Login
