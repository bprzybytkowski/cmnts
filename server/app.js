const express = require('express');
const db = require('./db');
const apiRouter = require('./routes');
const cors = require('cors')

const app = express();

app.use(cors());
app.use('/api', apiRouter.initRouter(db));

module.exports = app;