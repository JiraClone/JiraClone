const ProjectController = require('../controllers/project.controller');
const {authenticate} = require('../config/jwt.config');

module.exports = function(app){
    app.post('/api/projects', authenticate, ProjectController.create);
    app.get('/api/projects', authenticate, ProjectController.findAll);
    app.delete('/api/projects/:id', authenticate, ProjectController.delete);
    app.put('/api/projects/:id', authenticate, ProjectController.update);
    app.get('/api/projects/:id', authenticate, ProjectController.findById);
}