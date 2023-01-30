/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const express = require('express')
const Blog = require('../models/blog')

/////////////////////////////////////
//// Create Router               ////
/////////////////////////////////////
const router = express.Router()

//////////////////////////////
//// Routes               ////
//////////////////////////////

// INDEX route 
// Read -> finds and displays all blog
router.get('/', (req, res) => {
    const { username, loggedIn, userId } = req.session
    // find all the blog
    Blog.find({})
        // there's a built in function that runs before the rest of the promise chain
        // this function is called populate, and it's able to retrieve info from other documents in other collections
        .populate('owner', 'username')
        .populate('comments.author', '-password')
        // send json if successful
        .then(blogs => { 
            // res.json({ blog: blog })
            // now that we have liquid installed, we're going to use render as a response for our controllers
            res.render('blogs/index', { blogs, username, loggedIn, userId })
        })
        // catch errors if they occur
        .catch(err => {
            console.log(err)
            // res.status(404).json(err)
            res.redirect(`/error?error=${err}`)
        })
})

// GET for the new page
// shows a form where a user can create a new blog
router.get('/new', (req, res) => {
    res.render('blogs/new', { ...req.session })
})

// CREATE route
// Create -> receives a request body, and creates a new document in the database
router.post('/', (req, res) => {
    // console.log('this is req.body before owner: \n', req.body)
    // here, we'll have something called a request body
    // inside this function, that will be called req.body
    // we want to pass our req.body to the create method
    // we want to add an owner field to our blog
    // luckily for us, we saved the user's id on the session object, so it's really easy for us to access that data
    req.body.owner = req.session.userId

    // we need to do a little js magic, to get our checkbox turned into a boolean
    // here we use a ternary operator to change the on value to send as true
    // otherwise, make that field false


    /////////////////////////////////IT NEEDS TO LOOK /////////////////////////////////////
    // req.body.readyToEat = req.body.readyToEat === 'on' ? true : false
    const newBlog = req.body
    console.log('this is req.body aka newBlog, after owner\n', newBlog)
    Blog.create(newBlog)
        // send a 201 status, along with the json response of the new blog
        .then(blog => {
            console.log(blog)
            // in the API server version of our code we sent json and a success msg
            // res.status(201).json({ blog: blog.toObject() })
            // we could redirect to the 'mine' page
            // res.status(201).redirect('/blog/mine')
            // we could also redirect to the new blog's show page
            res.redirect(`/blogs/${blog.id}`)
        })
        // send an error if one occurs
        .catch(err => {
            console.log(err)
            // res.status(404).json(err)
            res.redirect(`/error?error=${err}`)
        })
})

// GET route
// Index -> This is a user specific index route
// this will only show the logged in user's blog
router.get('/mine', (req, res) => {
    // find blog by ownership, using the req.session info
    const { username, loggedIn, userId } = req.session
    console.log(req.session)
    Blog.find({ owner: userId })
        .populate('owner', 'username')
        .populate('comments.author', '-password')
        .then(blog => {
            // if found, display the blog
            // res.status(200).json({ blog: blog })
            res.render('blogs/mine', { blog, username, loggedIn })
        })
        .catch(err => {
            // otherwise throw an error
            console.log(err)
            // res.status(400).json(err)
            res.redirect(`/error?error=${err}`)
        })
})

// // GET route for getting json for specific user blog
// // Index -> This is a user specific index route
// // this will only show the logged in user's blog
// router.get('/json', (req, res) => {
//     // find blog by ownership, using the req.session info
//     Blog.find({ owner: req.session.userId })
//         .populate('owner', 'username')
//         .populate('comments.author', '-password')
//         .then(blog => {
//             // if found, display the blog
//             res.status(200).json({ blog: blog })
//             // res.render('blog/index', { blog, ...req.session })
//         })
//         .catch(err => {
//             // otherwise throw an error
//             console.log(err)
//             res.status(400).json(err)
//         })
// })

// GET request -> edit route
// shows the form for updating a blog
router.get('/edit/:id', (req, res) => {
    // because we're editing a specific blog, we want to be able to access the blog's initial values. so we can use that info on the page.
    const blogId = req.params.id
    Blog.findById(blogId)
        .then(blog => {
            res.render('blogs/edit', { blogs, ...req.session })
        })
        .catch(err => {
            res.redirect(`/error?error=${err}`)
        })
})

// PUT route
// Update -> updates a specific blog(only if the blog's owner is updating)
router.put('/:id', (req, res) => {
    const id = req.params.id
    req.body.title = req.body.title === 'on' ? true : false
    Blog.findById(id)
        .then(blog => {
            // if the owner of the blog is the person who is logged in
            if (blog.owner == req.session.userId) {
                // send success message
                // res.sendStatus(204)
                // update and save the blog
                return blog.updateOne(req.body)
            } else {
                // otherwise send a 401 unauthorized status
                // res.sendStatus(401)
                res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20edit%20this%20blog`)
            }
        })
        .then(() => {
            // console.log('the blog?', blog)
            res.redirect(`/blogs/mine`)
        })
        .catch(err => {
            console.log(err)
            // res.status(400).json(err)
            res.redirect(`/error?error=${err}`)
        })
})

// DELETE route
// Delete -> delete a specific blog
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then(blog => {
            // if the owner of the blog is the person who is logged in
            if (blog.owner == req.session.userId) {
                // send success message
                // res.sendStatus(204)
                // delete the blog
                return blog.deleteOne()
            } else {
                // otherwise send a 401 unauthorized status
                // res.sendStatus(401)
                res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20blog`)
            }
        })
        .then(() => {
            res.redirect('/blogs/mine')
        })
        .catch(err => {
            console.log(err)
            // res.status(400).json(err)
            res.redirect(`/error?error=${err}`)
        })
})

// SHOW route
// Read -> finds and displays a single resource
router.get('/:id', (req, res) => {
    // get the id -> save to a variable
    const id = req.params.id
    // use a mongoose method to find using that id
    Blog.findById(id)
        .populate('comments.author', 'username')
        // send the blog as json upon success
        .then(blog => {
            // res.json({ blog: blog })
            res.render('blogs/show.liquid', {blog, ...req.session})
        })
        // catch any errors
        .catch(err => {
            console.log(err)
            // res.status(404).json(err)
            res.redirect(`/error?error=${err}`)
        })
})


//////////////////////////////
//// Export Router        ////
//////////////////////////////
module.exports = router