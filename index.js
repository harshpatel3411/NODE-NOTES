require('dotenv').config()//used to use .env file(you can comment it when you are not using port from .env file)

const express = require('express')//old method to import express

console.log(typeof express);//function

const app = express()

// const port = 4000//Method -1

const GithubData={
  "login": "hiteshchaudhary",
  "id": 17576078,
  "node_id": "MDQ6VXNlcjE3NTc2MDc4",
  "avatar_url": "https://avatars.githubusercontent.com/u/17576078?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/hiteshchaudhary",
  "html_url": "https://github.com/hiteshchaudhary",
  "followers_url": "https://api.github.com/users/hiteshchaudhary/followers",
  "following_url": "https://api.github.com/users/hiteshchaudhary/following{/other_user}",
  "gists_url": "https://api.github.com/users/hiteshchaudhary/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/hiteshchaudhary/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/hiteshchaudhary/subscriptions",
  "organizations_url": "https://api.github.com/users/hiteshchaudhary/orgs",
  "repos_url": "https://api.github.com/users/hiteshchaudhary/repos",
  "events_url": "https://api.github.com/users/hiteshchaudhary/events{/privacy}",
  "received_events_url": "https://api.github.com/users/hiteshchaudhary/received_events",
  "type": "User",
  "user_view_type": "public",
  "site_admin": false,
  "name": null,
  "company": null,
  "blog": "",
  "location": null,
  "email": null,
  "hireable": null,
  "bio": null,
  "twitter_username": null,
  "public_repos": 0,
  "public_gists": 0,
  "followers": 6,
  "following": 0,
  "created_at": "2016-03-01T18:11:15Z",
  "updated_at": "2016-03-01T18:11:15Z"
}
 


app.get('/', (req, res) => {
  res.send('Hello World!')
})
 

app.get('/twitter', (req, res) => {
    res.send('harsh patel')
  })


app.get('/login',(req,res)=>{
    res.send('<h1>please login</h1>')
})

app.get('/youtube',(req,res)=>{
    res.send('<h2>Chai aur Code</h2>')
})
app.get('/github',(req,res)=>{
  res.json(GithubData)
})


//This listen is for method 1
// app.listen(port, (req,res) => {
//   console.log(`Example app listening on port ${port}`)
// }) //comment it when you are using method 2
//here i have taken random url



//This listen is for method 2
app.listen(process.env.PORT, (req,res) => {
    console.log(`Example app listening on port ${process.env.PORT}`)
  })//comment it when you are using method-1
  //here i have taken port form .env file 






  
// step-1 :- create index.js
//step 2:-create script in package.json("start": "node index.js")
// Note :- Jyare pan code update kare tyare server restart karvu pade