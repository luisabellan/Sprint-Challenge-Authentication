const express = require("express")
const dotenv = require("dotenv")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const authModel = require("./auth-model")
const userModel = require("../users/users-model")
const restrict = require("./authenticate-middleware")
const db = require("../database/dbConfig")

const router = express.Router()

router.post("/register", async (req, res, next) => {
	try {
		const { username } = req.body
		const user = await userModel.findByUsername(username)

		if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
		}

		res.status(201).json(await userModel.add(req.body))
	} catch(err) {
		next(err)
	}
})

router.post("/login", async (req, res, next) => {
	const authError = {
		message: "Invalid Credentials",
	}

	try {
		const user = await userModel.findByUsername(req.body.username)
		if (!user) {
			return res.status(401).json(authError)
		}

		const passwordValid = await bcrypt.compare(req.body.password, user.password)
		if (!passwordValid) {
			return res.status(401).json(authError)
		}

		// create a new session in the database
		const session = await authModel.add({
			user_id: user.id,
			// a SQLite trick to set a date in the future
			expires: db.raw("DATETIME('now', 'localtime', '+1 hour')"),
		})

		// add the session details and other user details to the token payload
		const token = jwt.sign({
			sessionId: session.id,
			username: user.username,
			userRole: user.role,
		}, process.env.JWT_SECRET || "La vida es sueño")

		res.cookie("token", token)
		res.json({
			message: `Welcome ${user.username}!`,
		})
	} catch(err) {
		next(err)
	}
})

router.get("/logout",  async (req, res, next) => {
	try {
		await authModel.deleteById(req.session.id)

		// instruct the client to delete the cookie (but it's  not required to)
		res.cookie("token", "", { maxAge: 0 })
		res.status(204).end()
	} catch(err) {
		next(err)
	}
})

module.exports = router