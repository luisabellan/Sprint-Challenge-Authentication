const server = require('./api/server.js');
const dotenv = require('dotenv')

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`);
});
