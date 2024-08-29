const ideasRouter = require('express').Router();

const {
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db');

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
  
    if(!idea) {
      res.status(404).send('Idea not found.');
    } else {
      req.idea = idea
      next()
    }
  })
  
  ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
  
    if (newIdea === null) {
      res.status(400).send('Invalid idea data.')
    } else {
      res.status(201).json(newIdea);
    }
  
  });
  
  ideasRouter.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    res.send(ideas)
  });
  
  ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
  });
  
  ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    const updatedIdeaData = {
      ...req.idea, // Start with existing data
      ...req.body // Override with any new data
    }
  
    const updatedIdea = updateInstanceInDatabase('ideas', updatedIdeaData);
  
    if (!updatedIdea) {
      res.status(400).send('Invalid idea data.')
    } else {
      res.status(200).send(updatedIdea)
    }
  
  });
  
  ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleteIdea = deleteFromDatabasebyId('ideas', req.idea.id);
  
    if (!deleteIdea) {
      res.status(500).send('Failed to delete idea.');
    } else {
      res.status(204).send('Successfully deleted idea.');
    }
  });

  module.exports = ideasRouter;