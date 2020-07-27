const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');


require('../server/config/mongoose.config');
require('dotenv').config({path: __dirname + '/./.env'});
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./routes/user.routes')(app);
require('./routes/project.routes')(app);
require('./routes/task.routes')(app);

app.listen(port, () => console.log(`Listening on port: ${port}`));
