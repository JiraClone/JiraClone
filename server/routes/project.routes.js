const ProjectController = require('../controllers/project.controller');
const {authenticate} = require('../config/jwt.config');

module.exports = function(app){
    app.post('/api/projects',  ProjectController.create);
    app.get('/api/projects',  ProjectController.findAll);
    app.delete('/api/projects/:id',  ProjectController.delete);
    app.put('/api/projects/:id',  ProjectController.update);
    app.get('/api/projects/:id',  ProjectController.findById);
}