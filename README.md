#My Blog App 

This blog app is my second project.</br>

Inspired to write this project as I didnt find the any blog posts that covers varieties of topics. Yet there are many bloggers and blog pages but thery are not visually attractive.
</hr>

<h4>TechnologiesIncluded </h4>
<ol>
<li>HTML</li>
<li>CSS</li>
<li>Javascript</li>
<li>Bootstrap</li>
<li>Liquidjs</li>
<li>Nodejs</li>
<li>Express</li>
<li>MongoDB</li>
<li>Mongoose</li>
</ol>
</hr>
_______________________________________________________

<h4>As a user I want the ability to </h4>

<ul>
<li>SigninL</li>
<li>SignUP</li>
<li>Create Blog Posts</li>
<li>Comment</li>
<li>Delete Comments</li>
<li>Edit Posts</li>

</ul>
<hr>

![Alt text](images/sign_inhot%202023-02-01%20at%201.08.54%20PM.png)

![Alt text](images/CreatePost.png)

![Alt text](images/comments.png)

![Alt text](images/mobilenavigation.png)

![Alt text](images/Screenshot%202023-02-01%20at%208.35.21%20AM.png)

<hr>



## Route tables for documents

#### blogs

| **URL**          | **HTTP Verb**|**Action**|
|------------------|--------------|----------|
| /blogs/         | GET          | index  
| /blogs/:id      | GET          | show       
| /blogs/new      | GET          | new   
| /blogs          | POST         | create   
| /blogs/:id/edit | GET          | edit       
| /blogs/:id      | PATCH/PUT    | update    
| /blogs/:id      | DELETE       | destroy  

#### Comments

| **URL**          | **HTTP Verb**|**Action**|
|--------------------|--------------|----------|
| /comments/:blogId | POST         | create  
| /comments/delete/:blogId/:commentId      | DELETE          | destroy       


#### Users

| **URL**          | **HTTP Verb**|**Action**|
|------------------|--------------|----------|
| /users/signup    | GET         | new  
| /users/signup    | POST         | create  
| /users/login     | GET         | login       
| /users/login     | POST         | create       
| /users/logout    | DELETE       | destroy 


<hr>

 
                     ERD

  ![Alt text](images/thumbnail.jpeg)

