const express = require('express');
const router = express.Router()
const addPage = require('../views/addPage.js')
const {db, Page, User} = require('../models/index.js')
const wikipage = require('../views/wikipage.js')
const mainPage = require('../views/main.js')

function generateSlug (title) {
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

router.use(express.urlencoded({ extended: false }));
router.use(express.json())

router.get('/', async (req,res,next) => {
    try {
        const pages = await Page.findAll()
        res.send(mainPage(pages))
    } catch(error) {
        next(error)
    }
})

router.post('/', async(req,res,next) => {
    let title = req.body.title;
    let content = req.body.content;
    let status = req.body.status;
    let slug = generateSlug(title)
    try {
        const page = await Page.create({
            title: title,
            content: content,
            status: status,
            slug: slug
        });
        let [user, wasCreated] = await User.findOrCreate({
            where: {
                name: req.body.author,
                email: req.body.email
            }
        });

        await page.setAuthor(user);

        res.redirect(`/wiki/${page.slug}`);
    } catch(error) {
        next(error)
    }
})

router.get('/add', (req,res,next) => {
    res.send(addPage())
})

router.get('/:slug', async (req, res, next) => {
    try {
        const page = await Page.findOne({
            where: {
                slug: req.params.slug
            }
        });
        const user = await User.findOne({
            where: {
                id: page.authorId
            }
        })
        res.send(wikipage(page, user));
    } catch (error) {
        next(error)
    }
});

module.exports = router;