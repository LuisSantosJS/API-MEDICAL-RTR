
exports.up = async (knex) => {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary().unique();
        table.boolean('disabled').notNullable();
        table.string('name', 255).notNullable();
        table.string('email', 255).notNullable();
        table.string('token').notNullable();
        table.string('password', 255).notNullable();
    });
}

exports.down = async (knex) => {
    return knex.schema.dropTable('users');
}