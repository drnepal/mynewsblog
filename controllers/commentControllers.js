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
// Subdocuments are not mongoose models. That means they don't have their own collection, and they don't come with the same model methods that we're used to(they have some their own built in.)
// This also means, that a subdoc is never going to be viewed without it's parent document. We'll never see a comment without seeing the blog it was commented on first.

// This also means, that when we make a subdocument, we must MUST refer to the parent so that mongoose knows where in mongodb to store this subdocument

// POST -> `/comments/<someBlogId>`
// only loggedin users can post comments
// bc we have to refer to a blog, we'll do that in the simplest way via the route
router.post('/:blogId', (req, res) => {
    // first we get the blogId and save to a variable
    const blogId = req.params.blogId
    // then we'll protect this route against non-logged in users
    console.log('this is the session\n', req.session)
    if (req.session.loggedIn) {
        // if logged in, make the logged in user the author of the comment
        // this is exactly like how we added the owner to our blogs
        req.body.author = req.session.userId
        // saves the req.body to a variable for easy reference later
        const theComment = req.body
        // find a specific blog
        Blog.findById(blogId)
            .then(blog => {
                // create the comment(with a req.body)
                blog.comments.push(theComment)
                // save the blog
                return blog.save()
            })
            // respond with a 201 and the blog itself
            .then(blog => {
                // res.status(201).json({ blog: blog })
                res.redirect(`/blogs/${blog.id}`)
            })
            // catch and handle any errors
            .catch(err => {
                console.log(err)
                // res.status(400).json(err)
                res.redirect(`/error?error=${err}`)
            })
    } else {
        // res.sendStatus(401) //send a 401-unauthorized
        res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20comment%20on%20this%20blog`)
    }
})

// DELETE -> `/comments/delete/<someFruitId>/<someCommentId>`
// make sure only the author of the comment can delete the comment
router.delete('/delete/:blogId/:commId', (req, res) => {
    // isolate the ids and save to variables so we don't have to keep typing req.params
    // const blogId = req.params.blogId
    // const commId = req.params.commId
    const { blogId, commId } = req.params
    // get the blog
    Blog.findById(blogId)
        .then(blog => {
            // get the comment, we'll use the built in subdoc method called .id()
            const theComment = blog.comments.id(commId)
            console.log('this is the comment to be deleted: \n', theComment)
            // then we want to make sure the user is loggedIn, and that they are the author of the comment
            if (req.session.loggedIn) {
                // if they are the author, allow them to delete
                if (theComment.author == req.session.userId) {
                    // we can use another built in method - remove()
                    theComment.remove()
                    blog.save()
                    // res.sendStatus(204) //send 204 no content
                    res.redirect(`/blogs/${blog.id}`)
                } else {
                    // otherwise send a 401 - unauthorized status
                    // res.sendStatus(401)
                    res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20comment`)
                }
            } else {
                // otherwise send a 401 - unauthorized status
                // res.sendStatus(401)
                res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20comment`)
            }
        })
        .catch(err => {
            console.log(err)
            // res.status(400).json(err)
            res.redirect(`/error?error=${err}`)
        })
})


//////////////////////////////
//// Export Router        ////
//////////////////////////////
module.exports = router