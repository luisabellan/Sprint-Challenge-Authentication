import React, { useState } from "react"
import axios from "axios"
import dotenv from 'dotenv'

export default function() {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [role, setRole] = useState()
	const [status, setStatus] = useState("normal")
	
	const handleSubmit = (evt) => {
		evt.preventDefault()

		const payload = { username, password, role }

		setStatus("")
		axios.post(`http://localhost:${process.env.PORT}/register`, payload)
			.then(() => setStatus("Account created!"))
			.catch((err) => setStatus(err.data))
	}

	return (
		<form onSubmit={handleSubmit}>
			<h1>Register</h1>
			{status && <p>{status}</p>}
			
			<input
				type="text"
				placeholder="Choose a Username"
				value={username}
				onChange={e => setUsername(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Choose a Password"
				value={password}
				onChange={e => setPassword(e.target.value)}
			/>
			<select
				value={role}
				onChange={e => setRole(e.target.value)}>
				<option disabled>Choose a role</option>
				<option value="normal">Normal</option>
				<option value="admin">Admin</option>
			</select>

			<button type="submit">Submit</button>
		</form>
	)
}