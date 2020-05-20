const axios = require('axios');
const restrict = require("../auth/authenticate-middleware")

const router = require('express').Router();
// restrict()
router.get('/',  async (req, res, next) => {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };
  
  try{
    console.log("session:", req.session)

    axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
  }catch(err){
    next(err)
  }

});

module.exports = router;
