const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose");

require('dotenv').config();

const authRoutes = require("./src/routes/auth")
const recordRoutes = require("./src/routes/inventory")
const reportRoutes = require("./src/routes/report");

const app = express()

const port = process.env.SERVER_PORT || 4000
const mongodbUrl = `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

app.use(express.json());
app.use(cors())

app.use(express.static(__dirname + '/public'));

app.use('/auth', authRoutes)
app.use('/record', recordRoutes)
app.use('/report', reportRoutes)

app.get('/', function (req, res, next) {
    res.status(200).sendFile(__dirname + "/public/index.html");
})

app.use((req, res, next) => {
    res.status(404).sendFile(__dirname + "/public/404.html");
})

mongoose.set("strictQuery", false);
mongoose.connect(mongodbUrl)
    .then(
        (conn) => {
            app.listen(port, () => {
                console.log(`Server listening on port "${port}".`);
            })
        }
    )
    .catch()
