const express = require("express")
const userModel = require("./users-model")

const router = express.Router()
router.get("/",  async (req, res, next) => {
	try {
		console.log("session:", req.session)
		res.json(await userModel.find())
	} catch(err) {
		next(err)
	}
})
router.get("/:id",  async (req, res, next) => {
	try {
		res.json(await userModel.findById(req.params.id))
	} catch(err) {
		next(err)
	}
})

// UPDATE USER
router.put("/:id", (req, res) => {
	if (!req.body.username) {
		return res.status(400).json({
			errorMessage: "Please provide username for the user.",
		});
	}

	Users.validateUser(req.params.id)

	Users.update(req.params.id, req.body)
		.then((user) => {
		//	console.log(res);

			return res.status(200).json(user);
		})
		.catch((error) => {
			console.log(error);
			return res.status(500).json({
				error: "The user information could not be modified.",
			});
		});
});

module.exports = router