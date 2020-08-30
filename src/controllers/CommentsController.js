const knex = require('../database/connection');
module.exports = {
    async index(request, response) {
        const { postID } = request.query;
        knex('comments').where('postID', postID).select('*').then(res => {
            return response.json({ message: 'success', data: res })
        }).catch(err => {
            return response.json({ message: 'error', data: err })
        })
    },
    async createComment(request, response) {
        const {
            userID,
            postID,
            color,
            comment,
            date,
            numberStatus,
            solit,
            status,
            statusText
        } = request.body;
        if (postID == null) {
            return response.json({ message: 'falta o ID do  post' })
        }
        if (color == null) {
            return response.json({ message: 'falta a cor' })
        }
        if (userID == null) {
            return response.json({ message: 'falta o ID do USer' })
        }
        if (comment == null) {
            return response.json({ message: 'falta o comentario' })
        }
        if (date == null) {
            return response.json({ message: 'falta a data' })
        }
        if (numberStatus == null) {
            return response.json({ message: 'falta o numero de estado' })
        }
        if (solit == null) {
            return response.json({ message: 'falta o booleano solit' })
        }
        if (status == null) {
            return response.json({ message: 'falta o status' })
        }
        if (statusText == null) {
            return response.json({ message: 'falta o status text' })
        }
        knex('comments').insert([{
            userID,
            postID,
            color,
            comment,
            date,
            numberStatus,
            solit,
            status,
            statusText
        }]).then(() => {
            knex('comments').select('*').then(res => {
                request.app.io.emit(`comment-${postID}`, res);
            }).finally(() => {
                return response.json({ message: 'success' })
            })
        }).catch(err => {
            return response.json({ message: 'error', err })
        })

    },
    async deleteComment(request, response) {
        const { commentID, postID } = request.body;
        if(postID == null){
            return response.json({ message: 'falta o postID' })
        }
        if(commentID == null){
            return response.json({ message: 'falta o commentID' })
        }
        knex('comments').where(id, commentID).delete().then(()=>{
            knex('comments').select('*').then(res => {
                request.app.io.emit(`comment-${postID}`, res);
            }).finally(() => {
                return response.json({ message: 'success' })
            })
        }).catch(err => {
            return response.json({ message: 'error', err })
        })
    }
}