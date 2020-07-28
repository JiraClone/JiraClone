const {Project} = require('../models/project.model');

module.exports.create = (req, res) =>{
    Project.create(req.body)
        .then(project =>{
            res.json({project});
        })
        .catch(err => res.status(400).json(err));
}

module.exports.findAll = (req, res)=>{
    Project.find({})
        .then(projects => res.json(projects))
        .catch(err => res.json(err));
}

module.exports.findByUserId = (req, res) =>{
    Project.find({users: req.params.user})
        .then(projects => res.json(projects))
        .catch(err => res.json(err));
}

module.exports.findById =(req, res)=>{
    Project.findOne({_id: req.params.id})
        .then(project => res.json(project))
        .catch(err => res.json(err));
}

module.exports.delete = (req, res) =>{
    Project.deleteOne({_id: req.params.id})
        .then(r => res.json(r))
        .catch(err => res.json(err));
}

module.exports.update = (req, res) =>{
    Project.updateOne({_id: req.params.id}, req.body, {new:true, runValidators: true})
        .then(r => res.json(r))
        .catch(err => res.status(400).json(err));
}

module.exports.addUser = (req, res) =>{
    Project.updateOne({_id: req.params.id}, {$push: {users: req.params.user}}, {new:true})
        .then(r => res.json(r))
        .catch(err => res.status(400).json(err));
}