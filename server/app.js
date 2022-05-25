const express = require('express');
const db = require('./db');
const apiRouter = require('./routes');

const app = express();

app.use('/api', apiRouter.initRouter(db));

module.exports = app;