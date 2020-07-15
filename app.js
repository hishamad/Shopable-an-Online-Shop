const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Express
const app = express();
const mode = process.env.NODE_ENV;

module.exports = app;