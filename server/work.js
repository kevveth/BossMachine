const workRouter = require('express').Router({mergeParams: true});
const { 
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase
 } = require('./db');

workRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);

    if(work === null) {
        return res.status(404).send('Work not found.');
    }

    req.work = work;
    next()
})

workRouter.get('/', (req, res, next) => {
    const minionId = req.minion.id;
    const allWork = getAllFromDatabase('work');
    const minionsWork = allWork.filter(work => work.minionId === minionId);
    res.send(minionsWork);
});

workRouter.put('/:workId', (req, res, next) => {
    // Get the minion ID from the request object
    const minionId = req.minion.id;

    // Check if the work item exists
    // This should be set by the workRouter.param middleware
    if (!req.work) {
        return res.status(404).send('Work not found.');
    }

    // Get the minionId of the work item
    const workMinionId = req.work.minionId;

    // Check if the work item belongs to the current minion
    if (minionId !== workMinionId) {
        return res.status(400).send('Work item does not belong to this minion.');
    }

    // Update the work item
    const updatedWork = updateInstanceInDatabase('work', req.body);

    // Check if the update was successful
    if (!updatedWork) {
        res.status(400).send('Invalid work data');
    } else {
        res.status(200).json(updatedWork);
    }
});

module.exports = workRouter;