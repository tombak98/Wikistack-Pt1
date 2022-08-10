const express = require('express')
const morgan = require('morgan')
const { addPage, editPage, main, userList, userPages, wikiPage } = require('./views/index.js')

const app = express()

app.use(morgan("dev"))
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req,res,next)=> {
    res.send('Hello World')
})

const PORT = 1337;

app.listen(PORT, ()=> {
    console.log(`App listening in port ${PORT}`)
})