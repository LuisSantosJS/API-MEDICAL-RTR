const knex = require('../database/connection');
module.exports = {
    async index(request, response) {
        const { page } = request.query;
        if (page == null) {
            return response.json({ message: 'falta a paginação' })
        }
        const posts = await knex('posts')
            .limit(5)
            .offset((page - 1) * 5)
            .join('users', 'posts.userID', 'users.id')
            .select('posts.*').select('users.name', 'users.email')
            // .join('comments', 'posts.id', 'comments.postID')
            // .select(
            //     'comments.color',
            //     'comments.comment',
            //     'comments.date',
            //     'comments.numberStatus',
            //     'comments.solit',
            //     'comments.status',
            //     'comments.statusText')
            .orderBy('id', 'desc');
        return response.json(posts);
    },

    async createPost(request, response) {
        const {
            numberStatus,
            status,
            statusText,
            timestamp,
            timestampTarea,
            description,
            title,
            date,
        } = request.body;
        if (numberStatus == null) {
            return response.json({ message: 'falta o numberStatus' })
        }
        if (status == null) {
            return response.json({ message: 'falta o status' })
        }
        if (statusText == null) {
            return response.json({ message: 'falta o statusText' })
        }
        if (timestamp == null) {
            return response.json({ message: 'falta o timestamp' })
        }
        if (timestampTarea == null) {
            return response.json({ message: 'falta o timestamp tarea' })
        }
        if (title == null) {
            return response.json({ message: 'falta o title' })
        }
        if (date == null) {
            return response.json({ message: 'falta a data' })
        }
        if (description == null) {
            return response.json({ message: 'falta a descricao' })
        }
        knex('posts').insert([{
            numberStatus,
            status,
            statusText,
            timestamp,
            timestampTarea,
            description,
            title,
            date,
        }]).then(() => {
            return response.json({ message: 'success' })
        }).catch(() => {
            return response.json({ message: 'error' })
        })
    },
    async deletePost(request, response) {
        const { postID } = request.body;
        if (postID == null) {
            return response.json({ message: 'falta o id do Post' })
        }
        knex('posts').where('id', postID).delete().then(() => {
            return response.json({ message: 'success' })
        }).catch(() => {
            return response.json({ message: 'error' })
        })
    }
}