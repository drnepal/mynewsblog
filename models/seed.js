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
    const seedBlog = [
        {
          title: 'nodejs',
          content: 'This is the content of the first blog post.',
          author: 'wiki'
        },
        {title:What Does Lorem Ipsum Mean?
          Lorem ipsum, in graphical and textual context, refers to filler text that 
          is placed in a document or 
          visual presentation. Lorem ipsum is derived from 
          the Latin "dolorem ipsum" roughly translated as "pain itself."
          
          Lorem ipsum presents the sample font and orientatin
          of writing on web pages and other software applications where 
          content is not the main concern of the developer.
           
          author:google
        },
        {
          title: 'bp2',
          content: 'This is the content of the second blog post.',
          author: 'bw2'
        },
        {
          title: 'bp3',
          content: 'This is the content of the third blog post.',
          author: 'bw3 '
        },
        {
          title: 'First Blog Post',
          content: 'This is the content of the first blog post.',
          author: 'bw4'
        },
        {
          title: 'bp4',
          content: 'This is the content of the second blog post.',
          author: 'bw5'
        },
        {
          title: 'bp5',
          content: 'This is the content of the third blog post.',
          author: 'bw5'
        },
        {
          title: 'bp6',
          content: 'This is the content of the first blog post.',
          author: 'bw6'
        },
        {
          title: 'bp9',
          content: 'This is the content of the second blog post.',
          author: 'bw9'
        },
        // {
        //   title: 'Third Blog Post',
        //   content: 'This is the content of the third blog post.',
        //   author: 'Bob Johnson'
        // },
        // {
        //   title: 'First Blog Post',
        //   content: 'This is the content of the first blog post.',
        //   author: 'John Doe'
        // },
        // {
        //   title: 'Second Blog Post',
        //   content: 'This is the content of the second blog post.',
        //   author: 'Jane Smith'
        // },
        // {
        //   title: 'Third Blog Post',
        //   content: 'This is the content of the third blog post.',
        //   author: 'Bob Johnson'
        // },
        // {
        //   title: 'First Blog Post',
        //   content: 'This is the content of the first blog post.',
        //   author: 'John Doe'
        // },
        // {
        //   title: 'Second Blog Post',
        //   content: 'This is the content of the second blog post.',
        //   author: 'Jane Smith'
        // },
        // {
        //   title: 'Third Blog Post',
        //   content: 'This is the content of the third blog post.',
        //   author: 'Bob Johnson'
        // },
        // {
        //   title: 'First Blog Post',
        //   content: 'This is the content of the first blog post.',
        //   author: 'John Doe'
        // },
        // {
        //   title: 'Second Blog Post',
        //   content: 'This is the content of the second blog post.',
        //   author: 'Jane Smith'
        // },
        // {
        //   title: 'Third Blog Post',
        //   content: 'This is the content of the third blog post.',
        //   author: 'Bob Johnson'
        // },
        // Add 12 more blog post objects here
      ];
    // then we delete every fruit in the database(all instances of this resource)
    // this will delete any blogs that are not owned by a user
    Blog.deleteMany({ owner: null })
        .then(() => {
            // then we'll seed(create) our starter blogs
            Blog.create(seedBlog)
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