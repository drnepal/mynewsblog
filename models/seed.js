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
        title: "Meditation",
        content: "Meditation has been shown to have numerous benefits for mental and physical health. It can reduce stress, increase focus and creativity, and improve overall well-being. Whether you're a beginner or an experienced meditator, incorporating this practice into your daily routine can bring about positive changes in your life.",
        author: "Sarah Smith"
        },
        {
        title: "The Importance of Sleep",
        content: "Getting enough sleep is crucial for our physical and mental health. It helps to boost our immune system, improve memory, and increase our overall mood. However, many people struggle to get enough quality sleep. In this post, we'll explore some tips and tricks for getting a better night's rest.",
        author: "John Doe"
        },
        {
        title: "The Power of Positive Thinking",
        content: "Positive thinking has been shown to have a powerful impact on our mental and emotional well-being. It can help us to overcome challenges, boost our self-esteem, and improve our relationships with others. In this post, we'll discuss the benefits of positive thinking and how you can incorporate it into your daily life.",
        author: "Jane Doe"
        },
        {
        title: "Exercise",
        content: "Exercise is not only good for our physical health, but it also has numerous benefits for our mental well-being. Regular exercise can reduce stress, improve mood, and boost self-esteem. Whether you're a beginner or an experienced athlete, incorporating exercise into your daily routine can bring about positive changes in your life.",
        author: "Mike Johnson"
        },
        {
        title: "The Benefits of Mindfulness",
        content: "Mindfulness has become a popular trend in recent years due to its numerous benefits. It can help to reduce stress, improve focus, and increase overall well-being. Whether you're a beginner or an experienced practitioner, incorporating mindfulness into your daily routine can bring about positive changes in your life.",
        author: "Laura Williams"
        },
        
          {
          title: "The Importance of Hydration",
          content: "Staying hydrated is crucial for our physical and mental health. It helps to boost our energy levels, improve digestion, and keep our skin looking youthful. In this post, we'll discuss the benefits of hydration and how you can make sure you're getting enough water every day.",
          author: "David Brown"
          },
          {
          title: "The Power of Gratitude",
          content: "Gratitude has been shown to have a powerful impact on our mental and emotional well-being. It can help us to overcome challenges, boost our self-esteem, and improve our relationships with others. In this post, we'll discuss the benefits of gratitude and how you can incorporate it into your daily life.",
          author: "Sarah Johnson"
          },
          {
          title: "The Benefits of a Healthy Diet",
          content: "Eating a healthy diet is crucial for our physical and mental health. It helps to boost our energy levels, improve digestion, and reduce the risk of chronic diseases. In this post, we'll discuss the benefits of a healthy diet and how you can make sure you're getting all the nutrients you need every day.",
          author: "John Smith"
          },
          
          {
            title: "The Importance of Hydration",
            content: "Staying hydrated is crucial for our physical and mental health. It helps to boost our energy levels, improve digestion, and keep our skin looking youthful. In this post, we'll discuss the benefits of hydration and how you can make sure you're getting enough water every day.",
            author: "David Brown"
          },
          
          {
            title: "The Power of Gratitude",
            content: "Gratitude has been shown to have a powerful impact on our mental and emotional well-being. It can help us to overcome challenges, boost our self-esteem, and improve our relationships with others. In this post, we'll discuss the benefits of gratitude and how you can incorporate it into your daily life.",
            author: "Sarah Johnson"
          },
          
          {
            title: "The Benefits of a Healthy Diet",
            content: "Eating a healthy diet is crucial for our physical and mental health. It helps to boost our energy levels, improve digestion, and reduce the risk of chronic diseases. In this post, we'll discuss the benefits of a healthy diet and how you can make sure you're getting all the nutrients you need every day.",
            author: "John Smith"
          },
          {
            title: "The Importance of Self-Care",
            content: "Self-care is important for our physical and mental well-being. It helps to reduce stress, improve mood, and boost self-esteem. Whether you're a busy professional or a stay-at-home parent, incorporating self-care into your daily routine can bring about positive changes in your life.",
            author: "Jane Johnson"
          },
          
          {
            title: "nodejs",
            content: "This is the content of the first blog post.",
            author: "wiki"
          },
          // {
          //   title: "lorem_ipsum",
          //   content: "Lorem ipsum presents the sample font and orientation of writing on web pages and other software applications where content is not the main concern of the"
          //   author: "google"
          // }
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
          title: "First Blog Post",
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
        // {
        //   title: "ML",
        //   content:"Introduction to Machine Learning: Machine learning is a type of 
        //   artificial intelligence that allows software applications
        //    to become more accurate in predicting outcomes without being 
        //    explicitly programmed.",
        //    author:"search"
        // },
        {
          title: 'bp9',
          content: 'This is the content of the second blog post.',
          author: 'bw9'
        }
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
});