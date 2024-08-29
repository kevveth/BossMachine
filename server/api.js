const express = require('express');
const apiRouter = express.Router();

const minionsRouter = require('./minions');
const ideasRouter = require('./ideas');
const meetingsRouter = require('./meetings');

const {
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
  } = require('./db');

  // Minion Routes
apiRouter.use('/minions', minionsRouter);

// Idea Routes
apiRouter.use('/ideas', ideasRouter);

// Meeting Routes
apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;
