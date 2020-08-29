
exports.up = async (knex) => {
    return knex.schema.createTable('comments', table => {
        table.increments('id').primary().unique();
        table.integer('postID')
            .references('id').inTable('posts')
            .notNullable()
            .onDelete('CASCADE');
        table.integer('userID')
            .references('id').inTable('users')
            .notNullable()
            .onDelete('CASCADE');
        table.string('color', 20).notNullable();
        table.string('comment', 1024).notNullable();
        table.string('date', 1024).notNullable();
        table.float('numberStatus', 8, 2).notNullable();
        table.boolean('solit').notNullable();
        table.string('status', 255).notNullable();
        table.string('statusText', 255).notNullable();
        // table.timestamps(true, true);
    });
}

exports.down = async (knex) => {
    return knex.schema.dropTable('comments');
}