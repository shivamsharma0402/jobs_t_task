require('dotenv').config()

let config = {}

config.port = process.env.PORT || 3000

module.exports = config