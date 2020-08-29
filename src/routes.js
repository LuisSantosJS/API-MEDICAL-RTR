const express = require('express');
const PostsController = require('./controllers/PostsController');
const UsersController = require('./controllers/UserController');
const CommentController = require('./controllers/CommentsController');
const routes = express.Router();


routes.get('/posts', PostsController.index)
routes.post('/posts/create', PostsController.createPost)
routes.post('/posts/delete', PostsController.deletePost)

routes.get('/users', UsersController.index);
routes.post('/users/create', UsersController.create);
routes.post('/users/status/update', UsersController.enabledDisabled);
routes.post('/users/login', UsersController.login);

routes.get('/comments', CommentController.index);
routes.post('/comments/create', CommentController.createComment);
routes.post('/comments/delete', CommentController.deleteComment);


module.exports = routes;