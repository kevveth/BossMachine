const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body;
    const totalRev = Number(numWeeks) * Number(weeklyRevenue);

    if (!numWeeks || !weeklyRevenue || isNaN(totalRev) || totalRev < 1_000_000) {
        res.status(400).send()
    } else {
        next()
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
