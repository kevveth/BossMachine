const meetingsRouter = require('express').Router();

const {
    createMeeting,
    addToDatabase,
    getAllFromDatabase,
    deleteAllFromDatabase
} = require('./db');

meetingsRouter.post('/', (req, res, next) => {
    // const newMeetingData = req.body
    const newMeeting = addToDatabase('meetings', createMeeting());
  
    if (newMeeting === null) {
      res.status(400).send('Invalid meeting data.')
    } else {
      res.status(201).json(newMeeting)
    }
  })
  
meetingsRouter.get('/', (req, res, next) => {
    const meetings = getAllFromDatabase('meetings');
    res.send(meetings)
})
  
meetingsRouter.delete('/', (req, res, next) => {
    const deleteAllMeetings = deleteAllFromDatabase('meetings');
    
    if(deleteAllMeetings === null ) {
      res.status(500).send('Failed to delete all meetings.');
    } else {
      res.status(204).send('Successfully deleted all meetings.');
    }
})

module.exports = meetingsRouter;