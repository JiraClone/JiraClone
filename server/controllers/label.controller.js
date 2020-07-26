const {Label} = require('../models/label.model');

module.exports.create = (req, res) =>{
    Label.create(req.body)
        .then(label =>{
            res.json({label});
        })
        .catch(err => res.status(400).json(err));
}

module.exports.findAll = (req, res)=>{
    Label.find({})
        .then(labels => res.json(labels))
        .catch(err => res.json(err));
}

module.exports.findById =(req, res)=>{
    Label.findOne({_id: req.params.id})
        .then(label => res.json(label))
        .catch(err => res.json(err));
}

module.exports.delete = (req, res) =>{
    Label.deleteOne({_id: req.params.id})
        .then(r => res.json(r))
        .catch(err => res.json(err));
}

module.exports.update = (req, res) =>{
    Label.updateOne({_id: req.params.id}, req.body, {new:true, runValidators: true})
        .then(r => res.json(r))
        .catch(err => res.status(400).json(err));
}