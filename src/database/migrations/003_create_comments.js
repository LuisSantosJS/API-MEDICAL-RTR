
exports.up = async (knex) => {
    return knex.schema.createTable('comments', table => {
        table.increments('id').primary().unique();
        table.integer('postID', 255).unsigned().references('id').inTable('posts')
        table.integer('userID', 255).unsigned().references('id').inTable('users');
        table.string('color').notNullable();
        table.string('comment',2048).notNullable();
        table.string('date').notNullable();
        table.string('numberStatus').notNullable();
        table.boolean('solit').notNullable();
        table.string('status', 255).notNullable();
        table.string('statusText', 255).notNullable();
        // table.timestamps(true, true);
    });
}

exports.down = async (knex) => {
    return knex.schema.dropTable('comments');
}