
exports.up = async (knex) => {
    return knex.schema.createTable('posts', table => {
        table.increments('id').primary().unique();
        table.integer('userID', 255).unsigned().references('id').inTable('users');
        table.string('numberStatus').notNullable();
        table.string('status', 200).notNullable();
        table.string('views');
        table.string('statusText', 200).notNullable();
        table.string('timestamp').notNullable();
        table.string('timestampTarea').notNullable();
        table.string('description',2048).notNullable();
        table.string('title',1024).notNullable();
        table.string('date', 200).notNullable();
        table.string('dateAtual', 200).notNullable();
    });
}

exports.down = async (knex) => {
    return knex.schema.dropTable('posts');
}