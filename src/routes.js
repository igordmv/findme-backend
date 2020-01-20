const { Router } = require('express');
const routes = Router();
const UserController = require('./controllers/UserController')
const ProductController = require('./controllers/ProductController')
const authMiddleware = require('./middlewares/auth')

routes.get('/user/get', UserController.index);
routes.post('/user/auth', UserController.auth);
routes.post('/user/create', UserController.store);
routes.get('/products', authMiddleware, ProductController.test);

module.exports = routes;