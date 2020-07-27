const TaskController = require('../controllers/task.controller');

const {authenticate} = require('../config/jwt.config');

module.exports = function(app){
    app.post('/api/tasks', authenticate, TaskController.create);
    app.get('/api/tasks', authenticate, TaskController.findAll);
    app.delete('/api/tasks/:id', authenticate, TaskController.delete);
    app.put('/api/tasks/:id', authenticate, TaskController.update);
    app.get('/api/tasks/:id', authenticate, TaskController.findById);
}