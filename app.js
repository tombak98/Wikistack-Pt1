const express = require('express')
const morgan = require('morgan')
const { addPage, editPage, main, userList, userPages, wikiPage } = require('./views/index.js')
const layout = require('./views/layout')
const { db, Page, User } = require('./models/index.js')
const wikiRouter = require('./routes/wiki.js')
const usersRouter = require('./routes/users.js')
const PORT = 3000;

// initialize our database and listen on Port 3000
async function initializeDB() {
    await db.sync({force:true})
    app.listen(PORT, ()=> {
        console.log(`App listening in port ${PORT}`)
    })
}

initializeDB()

// App express and middleware
const app = express()

app.use('/wiki', wikiRouter)
app.use('/users', usersRouter)

app.use(morgan("dev"))
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req,res,next)=> {
    res.redirect('/wiki')
})