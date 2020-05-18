const express = require("express")
const userModel = require("./users-model")
const restrict = require("../auth/authenticate-middleware")

const router = express.Router()
// restrict(),
router.get("/",  async (req, res, next) => {
	try {
		console.log("session:", req.session)
		res.json(await userModel.find())
	} catch(err) {
		next(err)
	}
})

module.exports = router