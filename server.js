const express = require('express')
const CORS = require("cors")

const CONFIG = require('./config/config')

// routers
const routes = require('./routes/directory.routes')

const app = express()

app.use(CORS())
app.use(express.json())


app.use('/directory', routes);

app.listen(CONFIG.port, () => {
    console.log("Server running on " + CONFIG.port)
})
