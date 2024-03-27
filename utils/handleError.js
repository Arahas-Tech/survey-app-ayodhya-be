const handleError = (res, Status, error ) => {
    // return res.status(Status).send(`Error: ${error}`) ;
    return res.status(Status).send(error) ;
}

module.exports = handleError ;