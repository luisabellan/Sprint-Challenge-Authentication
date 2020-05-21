import { useEffect } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import dotenv from "dotenv"

export default function() {
	const history = useHistory()
	
	useEffect(() => {
		axios.get(`http://localhost:${process.env.PORT}/auth/logout`, { withCredentials: true })
			.catch((err) => console.error(err))
			// redirect whether we got an error or not
			.finally(() => history.push("/"))
	}, [history])
	
	return null
}