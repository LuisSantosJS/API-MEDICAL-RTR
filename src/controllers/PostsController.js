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
            userID,
            numberStatus,
            status,
            timestamp,
            timestampTarea,
            description,
            title,
            date,
        } = request.body;
        if (userID == null) {
            return response.json({ message: 'falta o ID do user' })
        }
        if (numberStatus == null) {
            return response.json({ message: 'falta o numberStatus' })
        }
        if (status == null) {
            return response.json({ message: 'falta o status' })
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
            userID,
            numberStatus,
            status,
            statusText: 'Pendiente',
            timestamp,
            views: [],
            timestampTarea,
            description,
            title,
            date,
        }]).then(() => {
            knex('posts').select('*').then(res => {
                request.app.io.emit('posts', res);
            }).finally(() => {
                return response.json({ message: 'success' })
            })
        }).catch((e) => {
            return response.json({ message: 'error', e })
        })
    },
    async deletePost(request, response) {
        const { postID } = request.body;
        if (postID == null) {
            return response.json({ message: 'falta o id do Post' })
        }
        knex('posts').where('id', postID).delete().then(() => {
            knex('posts').select('*').then(res => {
                request.app.io.emit('posts', res);
            }).finally(() => {
                return response.json({ message: 'success' })
            })
        }).catch(() => {
            return response.json({ message: 'error' })
        })
    },
    async updateStatus(request, response) {
        const { postID, status, numberStatus, statusText } = request.body;

        if (postID == null) {
            return response.json({ message: 'falta o id do Post' })
        }
        if (status == null) {
            return response.json({ message: 'falta o status' })
        }
        if (numberStatus == null) {
            return response.json({ message: 'falta o number status' })
        }
        if (statusText == null) {
            return response.json({ message: 'falta o status text' })
        }
        knex('posts').where('id', postID).update({
            status,
            numberStatus,
            statusText
        }).then(() => {
            knex('posts').select('*').then(res => {
                request.app.io.emit('posts', res);
            }).finally(() => {
                return response.json({ message: 'success' })
            })
        }).catch(() => {
            return response.json({ message: 'error' })
        })
    },
    async viewsUser(request, response) {
        const { postID, userEmail } = request.body;
        if (postID == null) {
            return response.json({ message: 'falta o id do post' })
        }
        if (userEmail == null) {
            return response.json({ message: 'falta o userEmail' })
        }
        const views = await knex('posts').select("posts.views").where('id', postID);
        const val = String(views.map(res => res.views));
        const splitArray = val.split(',');
        const search = splitArray.indexOf(userEmail);
        console.log('splitArray', splitArray);
        if (Number(search) >= 0) {
            return response.json({ message: 'Já visto' })
        }
        const newViews = String(String(splitArray) + ',' + String(userEmail))
        knex('posts').where('id', postID).update({
            views: Array(newViews)
        }).then(() => {
            knex('posts').select('*').then(res => {
                request.app.io.emit('posts', res);
            }).finally(() => {
                return response.json({ message: 'success' })
            })
        }).catch((err) => {
            return response.json({ message: 'error', data: err })
        })
    }
}