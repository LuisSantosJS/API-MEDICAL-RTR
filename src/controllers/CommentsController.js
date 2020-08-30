const knex = require('../database/connection');
module.exports = {
    async index(request, response) {
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
        if(postID == null){
            return response.json({ message: 'falta o ID do  post' })
        }
        if (color == null) {
            return response.json({ message: 'falta a cor' })
        }
        if(userID == null){
            return response.json({ message: 'falta o ID do USer' })
        }
        if(comment == null){
            return response.json({ message: 'falta o comentario' })
        }
        if(date == null){
            return response.json({ message: 'falta a data' })
        }
        if(numberStatus == null){
            return response.json({ message: 'falta o numero de estado' })
        }
        if(solit == null){
            return response.json({ message: 'falta o booleano solit' })
        }
        if(status == null){
            return response.json({ message: 'falta o status' })
        }
        if(statusText == null){
            return response.json({ message: 'falta o status text' })
        }

    },
    async createComment(request, response) {

    },
    async deleteComment(request, response) {

    }
}