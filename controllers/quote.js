const Quote = require('../models').Quote
const User = require('../models').User

const constants = require('../constants')

const getQuotes = (req, res) => {
    User.findOne({
        where: {username: req.params.username}
    }).then(resp => {

        if (resp != null){
            const newQuote = {
                quoteID: req.body.quoteID,
                char: req.body.char,
                userID: resp.id
            }

            Quote.findAll({
                where: {userID: resp.id}
            }).then((resp) => {
                res.send(resp)
            })
        } else {
            res.status(constants.BAD_REQUEST).send('Error: Username not found.')
        }
    }).catch(err => {
        res.status(constants.BAD_REQUEST).send(`Error: ${err}`)
    })
}

module.exports = {  
    getQuotes
}