
exports.up = async (knex) => {
    return knex.schema.createTable('posts', table => {
        table.increments('id').primary().unique();
        table.integer('userID')
            .references('id').inTable('users')
            .notNullable()
            .onDelete('CASCADE');
        table.float('numberStatus', 8, 2).notNullable();
        table.string('status', 255).notNullable();
        table.specificType('views', 'text[]').notNullable();
        table.string('statusText', 255).notNullable();
        table.float('timestamp', 8, 2).notNullable();
        table.float('timestampTarea', 8, 2).notNullable();
        table.string('description', 1024).notNullable();
        table.string('title', 255).notNullable();
        table.string('date', 255).notNullable();
        // table.timestamps(true, true);
    });
}

exports.down = async (knex) => {
    return knex.schema.dropTable('posts');
}