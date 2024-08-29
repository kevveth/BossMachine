const minionsRouter = require('express').Router();

const workRouter = require('./work');
minionsRouter.use('/:minionId/work', workRouter);

const {
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
  
    if (!minion) {
      res.status(404).send('Minion not found.')
    } else {
      req.minion = minion;
      next();
    }
  })
  
  minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
  
    if (newMinion === null) {
      res.status(400).send('Invalid minion data');
    }
  
    res.status(201).json(newMinion);
  })
  
  minionsRouter.get('/', (req, res, next) => {
      res.send(getAllFromDatabase('minions'));
  });
  
  minionsRouter.get('/:minionId', (req, res) => {
    res.send(req.minion);
  });
  
  minionsRouter.put('/:minionId', (req, res) => {
    const updatedMinionData = {
      ...req.minion, // Start with existing minion data
      ...req.body, // Override with any new data from the request body
    }
  
    const updatedMinion = updateInstanceInDatabase('minions', updatedMinionData);
  
    if (!updatedMinion) {
      res.status(400).send('Invalid minion data.')
    }
  
    res.send(updatedMinion);
  })
  
  minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleteMinion = deleteFromDatabasebyId('minions', req.minion.id);
  
    if (!deleteMinion) {
      res.status(500).send('Failed to delete minion.');
    } else {
      res.status(204).send('Successfully deleted minion.');
    }
  })

module.exports = minionsRouter;