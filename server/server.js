const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

require('../server/config/mongoose.config');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./routes/user.routes')(app);
require('./routes/project.routes')(app);
require('./routes/task.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));

//this is only for a test.
