const bcrypt = require("bcryptjs");
const db = require("../database/dbConfig");

async function add(user) {
  user.password = await bcrypt.hash(user.password, 14);

  const [id] = await db("users").insert(user);
  return findById(id);
}

function find() {
  return db("users").select("id", "username", "role"); // exclude password for security reasons
}
function findBy(filter) {
  return db("users").where({ filter }).first();
}

function findById(id) {
  return db("users").where({ id }).first();
}

function findByUsername(username) {
  return db("users").where({ username }).first();
}
//UPDATE USER
async function update(id, data) {
  await db("users").where({ id }).first().update(data);
  return findById(id);
}

async function validateUser(id) {
  findById(id)
    .then((user) => {
      if (user.length === 0) {
        return res.status(404).json({
          message: "The user with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function remove(id) {
  return db("users").status(204).del();
}

module.exports = {
  add,
  find,
  findById,
  findBy,
  findByUsername,
  update,
  remove,
  validateUser,
};
