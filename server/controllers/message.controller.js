const { Message } = require('../models/message.model');

module.exports.create = (req, res) =>{
    Message.create(req.body)
        .then(message =>{
            res.json({message});
        })
        .catch(err => res.status(400).json(err));
}

module.exports.findAll = (req, res)=>{
    Message.find({})
        .then(messages => res.json(messages))
        .catch(err => res.json(err));
}

module.exports.findById =(req, res)=>{
    Message.findOne({_id: req.params.id})
        .then(message => res.json(message))
        .catch(err => res.json(err));
}

module.exports.delete = (req, res) =>{
    Message.deleteOne({_id: req.params.id})
        .then(r => res.json(r))
        .catch(err => res.json(err));
}

module.exports.update = (req, res) =>{
    Message.updateOne({_id: req.params.id}, req.body, {new:true, runValidators: true})
        .then(r => res.json(r))
        .catch(err => res.status(400).json(err));
}