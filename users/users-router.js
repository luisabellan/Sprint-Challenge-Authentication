const express = require("express")
const userModel = require("./users-model")

// GET USERS
const router = express.Router()
router.get("/",  async (req, res, next) => {
	try {
		res.json(await userModel.find())
	} catch(err) {
		next(err)
	}
})
// GET USER BY ID
router.get("/:id",  async (req, res, next) => {
	try {
		res.json(await userModel.findById(req.params.id))
	} catch(err) {
		next(err)
	}
})

// CREATE USER
router.post("/", async (req, res, next) => {
	try {
		const user = await userModel.add(req.body)
		res.status(201).json(user)
	} catch (err) {
		next(err)
	}
})
// DELETE USER
router.delete("/:id", async (req, res, next) => {
	try {
		const user = await userModel.findById(req.params.id)
		res.status(204).json(user)
	} catch (err) {
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
	if (!req.body.role) {
		return res.status(400).json({
			errorMessage: "Please provide role for the user.",
		});
	}

	userModel.validateUser(req.params.id)

	userModel.update(req.params.id, req.body)
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