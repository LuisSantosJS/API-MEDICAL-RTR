
const knex = require('../database/connection');
const bcrypt = require('bcryptjs');
module.exports = {
    async index(request, response) {
        const users = await knex('users').select('users.name', 'users.email', 'users.id', 'users.disabled', 'users.token').orderBy('id', 'desc');
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
        const verifiUser = await knex('users').where('email', email).select('*');
        if (verifiUser.length !== 0) {
            return response.json({ message: 'usuário existente' })
        }
        bcrypt.hash(password, 10, function (err, hash) {
            knex('users').insert([{
                name,
                email,
                token: '',
                password: hash,
                disabled: false
            }]).then(() => {
                knex('users').select('*').then(res => {
                    request.app.io.emit('users', res);
                }).finally(() => {
                    return response.json({ message: 'success' })
                })
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
        if (passwordHash.length === 0) {
            return response.json({ message: 'error', err: 'usuário não existe' })
        }
        bcrypt.compare(String(password), String(passwordHash[0].password)).then(res => {
            // console.log(res, passwordHash[0].password)
            if (res === false) {
                return response.json({ message: 'password false' })
            }
            knex('users').where('email', email).select('*').then(res => {

                return response.json({ message: 'success', data: res[0] });
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
            knex('users').where('id', userID).select('*').then(res => {
                request.app.io.emit(`users-${userID}`, res[0]);
                knex('users').select('*').orderBy('id', "desc").then(resp=>{
                    request.app.io.emit(`userss`, resp);
                })
            }).finally(() => {
                return response.json({ message: 'success' })
            })
        }).catch(() => {
            return response.json({ message: 'error' })
        })
    },
    async uniqueUser(request, response) {
        const { userID } = request.query;
        if (userID == null) {
            return response.json({ message: 'falta o userID' })
        }
        knex('users').where('id', userID).select('users.name', 'users.email', 'users.id', 'users.disabled', 'users.token').then(res => {
            return response.json({ message: 'success', data: res[0] })
        }).catch((err) => {
            return response.json({ message: 'error', data: err })
        })
    }
}





