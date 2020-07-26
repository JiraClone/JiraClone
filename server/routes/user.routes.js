const UserController = require('../controllers/user.controller');

module.exports = function(app){
    app.post('/api/users', UserController.create);
    app.get('/api/users', UserController.findAll);
    app.delete('/api/users/:id', UserController.delete);
    app.put('/api/users/:id', UserController.update);
    app.get('/api/users/:id', UserController.findById);
}