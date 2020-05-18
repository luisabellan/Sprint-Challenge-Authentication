exports.up = async function(knex) {
	await knex.schema.createTable("users", (table) => {
		table.increments()
		table.text("username").notNull().unique()
		table.text("password").notNull()
		table.enum("role", ["normal", "admin"])
			.notNull()
			.defaultTo("normal")
	})

	await knex.schema.createTable("sessions", (table) => {
		table.increments()
		table.integer("user_id")
			.notNull()
			.references("id")
			.inTable("users")
			.onDelete("CASCADE")
			.onUpdate("CASCADE")
		table.timestamp("expires")
	})
}

exports.down = async function(knex) {
	await knex.schema.dropTableIfExists("sessions")
	await knex.schema.dropTableIfExists("users")
}