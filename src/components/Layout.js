import React from 'react'
import Menu from './Menu'
import Footer from './Footer'

const Layout = (props) => (
	<div>
	<Menu/>
	
	{props.children}
	<Footer/>
	</div>
)

export default Layout