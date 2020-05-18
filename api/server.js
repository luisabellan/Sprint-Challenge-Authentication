const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const usersRouter = require("../users/users-router")
const jokesRouter = require('../jokes/jokes-router.js');


const server = express();

server.use(helmet());
server.use(cors({
	credentials: true,
	origin: "http://localhost:3000",
}))
server.use(express.json());

server.use('/auth', authRouter);
server.use('/api/jokes',  jokesRouter);
server.use('/api/users',  usersRouter);

server.get("/", (req, res, next) => {
	res.status(200).json({
		message: "Welcome to our API",
	})
})

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})
module.exports = server;
