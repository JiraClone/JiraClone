const MessageController = require('../controllers/message.controller');

module.exports = function(app){
    app.post('/api/messages', MessageController.create);
    app.get('/api/messages', MessageController.findAll);
    app.delete('/api/messages/:id', MessageController.delete);
    app.put('/api/messages/:id', MessageController.update);
    app.get('/api/messages/:id', MessageController.findById);
}