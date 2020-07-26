const LabelController = require('../controllers/label.controller');

module.exports = function(app){
    app.post('/api/labels', LabelController.create);
    app.get('/api/labels', LabelController.findAll);
    app.delete('/api/labels/:id', LabelController.delete);
    app.put('/api/labels/:id', LabelController.update);
    app.get('/api/labels/:id', LabelController.findById);
}