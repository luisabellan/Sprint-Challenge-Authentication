import React, { useState, useHistory } from "react"
import cookie from "js-cookie"
import jwt from "jsonwebtoken"
import axios from "axios"

export default function(props) {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [status, setStatus] = useState("")
	
	
	const handleSubmit = (evt) => {
		evt.preventDefault()

		const payload = { username, password }

		// clear out any existing status message before submitting new request
		setStatus("")

		// `withCredentials` option is required to automatically save/send cookies
		axios.post("http://localhost:3300/auth/login", payload, { withCredentials: true })
			.then(() => {
				// cookie is set automatically when logged in,
				// pull the token out and decode it
				const decoded = jwt.decode(cookie.get("token"))

				setStatus(`Logged in as ${decoded.username}`)
				
			})
			.catch((err) => {
			 //setStatus(err.response.data.message)
			//	console.log(err);
			})
		/* 	.finally(() =>{
				const history = useHistory
				// nice for UX, auto redirect to the main dash
				history.push("/users");
			
			}) */
				
			

	};

	return (
		<form onSubmit={handleSubmit}>
			<h1>Login</h1>
			{status && <p>{status}</p>}
			
			<input
				type="text"
				placeholder="Username"
				value={username}
				onChange={e => setUsername(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>

			<button type="submit">Submit</button>
		</form>
	)
}