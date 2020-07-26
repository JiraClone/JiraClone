const {User} = require('../models/user.model');

module.exports.create = (req, res) =>{
    User.create(req.body)
        .then(user =>{
            res.json({message:"Success!", user: user});
        })
        .catch(err => res.status(400).json(err));
}

module.exports.findAll = (req, res)=>{
    User.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err));
}

module.exports.findById =(req, res)=>{
    User.findOne({_id: req.params.id})
        .then(user => res.json(user))
        .catch(err => res.json(err));
}

module.exports.delete = (req, res) =>{
    User.deleteOne({_id: req.params.id})
        .then(r => res.json(r))
        .catch(err => res.json(err));
}

module.exports.update = (req, res) =>{
    User.updateOne({_id: req.params.id}, req.body, {new:true, runValidators: true})
        .then(r => res.json(r))
        .catch(err => res.status(400).json(err));
}