/////////////////////////////////////
//// Import Dependencies         ////
/////////////////////////////////////
const mongoose = require('../utils/connection')
const Blog = require('./blog')

// Here, we'll add our seed script
// this will seed our database for us, just like our seed route did
// 
//// Seed Script code            ////
/////////////////////////////////////
// first, we'll save our db connection to a variable
const db = mongoose.connection

db.on('open', () => {
    // array of starter resources(blogs)
    const Blog = [
        {
          title: 'First Blog Post',
          content: 'This is the content of the first blog post.',
          author: 'John Doe'
        },
        {
          title: 'Second Blog Post',
          content: 'This is the content of the second blog post.',
          author: 'Jane Smith'
        },
        {
          title: 'Third Blog Post',
          content: 'This is the content of the third blog post.',
          author: 'Bob Johnson'
        },
        // Add 12 more blog post objects here
      ];
    // then we delete every fruit in the database(all instances of this resource)
    // this will delete any blogs that are not owned by a user
    Blog.deleteMany({ owner: null })
        .then(() => {
            // then we'll seed(create) our starter blogs
            Blog.create(startBlogs)
                // tell our app what to do with success and failures
                .then(data => {
                    console.log('here are the created blogs: \n', data)
                    // once it's done, we close the connection
                    db.close()
                })
                .catch(err => {
                    console.log('The following error occurred: \n', err)
                    // always close the connection
                    db.close()
                })
        })
        .catch(err => {
            console.log(err)
            // always make sure to close the connection
            db.close()
        })
})