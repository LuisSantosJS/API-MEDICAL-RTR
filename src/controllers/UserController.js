
const knex = require('../database/connection');
const bcrypt = require('bcryptjs');
module.exports = {
    async index(request, response) {
        const users = await knex('users').select('*').orderBy('id', 'desc');
        return response.json(users);
    },
    async create(request, response) {
        const { password, email, name } = request.body;
        if (name == null) {
            return response.json({
                message: 'sem nome'
            })
        }
        if (email == null) {
            return response.json({
                message: 'sem email'
            })
        }
        if (password == null) {
            return response.json({
                message: 'sem password'
            })
        }
        bcrypt.hash(password, 10, function (err, hash) {
            knex('users').insert([{
                name,
                email,
                password: hash
            }]).then(() => {
                return response.json({ message: 'success' })
            }).catch(() => {
                return response.json({ message: 'error' })
            })
        });

    },
    async login(request, response) {
        const { email, password } = request.body;
        if (email == null) {
            return response.json({ message: 'falta o email' })
        }
        if (password == null) {
            return response.json({ message: 'falta o password' })
        }
        const passwordHash = await knex('users').where('email', email).select('users.password');
        bcrypt.compare(password, passwordHash, function (err, res) {
            if (res === false) {
                return response.json({ message: 'password false' })
            }
            knex('users').where('email', email).select('*').then(res => {
                return response.json({ message: 'success', data: res });
            }).catch(err => {
                return response.json({ message: 'error', data: err });
            })
        });

    },
    async enabledDisabled(request, response) {
        const { userID, status } = request.body;
        if (userID == null) {
            return response.json({ message: 'falta o id do user' })
        }
        if (status == null) {
            return response.json({ message: 'falta o id do status' })
        }
        knex('users').where('id', userID).update({
            disabled: Boolean(status)
        }).then(() => {
            return response.json({ message: 'success' })
        }).catch(() => {
            return response.json({ message: 'error' })
        })
    }
}





