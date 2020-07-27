const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/jiradb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

autoIncrement.initialize(connection);

mongoose.connect("mongodb://localhost/jiradb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(() => console.log("Established connection to the database"))
    .catch(err => console.log("Something went wrong ", err));

