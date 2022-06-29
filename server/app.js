const express = require('express');
const db = require('./db');
const apiRouter = require('./routes');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use('/api', apiRouter.initRouter(db));
app.use(express.static(path.join(__dirname, '../client')))

module.exports = app;