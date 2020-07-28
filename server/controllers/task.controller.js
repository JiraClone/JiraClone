const { Task } = require('../models/task.model');

module.exports.create = (req, res) => {
    Task.create(req.body)
        .then((task) => {
            res.json({ task });
        })
        .catch((err) => res.status(400).json(err));
};

module.exports.findAll = (req, res) => {
    Task.find({})
        .then((tasks) => res.json(tasks))
        .catch((err) => res.json(err));
};

module.exports.findById = (req, res) => {
    Task.findOne({ _id: req.params.id })
        .then((task) => res.json(task))
        .catch((err) => res.json(err));
};

module.exports.delete = (req, res) => {
    Task.deleteOne({ _id: req.params.id })
        .then((r) => res.json(r))
        .catch((err) => res.json(err));
};

module.exports.update = (req, res) => {
    Task.updateOne({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
    })
        .then((r) => res.json(r))
        .catch((err) => res.status(400).json(err));
};

module.exports.findByNumber = (req, res) => {
    Task.findOne({ number: req.params.id })
        .then((task) => res.json(task))
        .catch((err) => res.json(err));
};
