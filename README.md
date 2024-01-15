# Silkroad Design Documents

## Table of Contents:
+ Introduction
+ MVP list
+ Demo
+ Technologies used
+ Preview
+ Database Schema
+ State
+ Frontend-routes
+ Backend-routes


## Introduction:
Ebuy is a full-stack web application, a social marketplace where users can post products/listings to sell and message postings to buy or inquire.

## (MVP list) Features:
- Users can search for listings by name or price tags
- Users can sign up, login, and logout 
- Users can move to the next page of listings with pagination
- Authenticated users can create/update/delete listing indicating description, location, price, and image
- Authenticated users can like and unlike listings
- Authenticated users can post messages on listings 

## Demo:


## Technologies used:
-	React
- Redux
- Redux thunk
-	React Router 
-	Axios
-	Material UI
- Algolia API
- Node
-	Express
-	Mongoose
- JWT
- Bcrypt
-	MongoDB

## Preview:

<img align="center" src="https://github.com/albertshay888/silkroad/blob/master/screenshots/postlisting.gif"  width="310" height="580" />


# Mongoose Database Schema

## `users`
| object key name   | data type | details                   |
|:------------------|:---------:|:--------------------------|
| `name`            | string    | required true             |
| `email`           | string    | required true             |                  |`password`         | string    | required true             |                 |  `id`             | string    | required true             |                  | `pic`             | string    | default  .png             |


  
## `postMessage`
| object key name      | data type | details                        |
|:---------------------|:---------:|:-------------------------------|
| `title`              | string   | required true                   |
| `message`            | string   | required true                   |
| `tags`               |[string]  |                                 |
| `creator`            | string   |                                 |
| `selectedFile`       | string   |                                 |
| `likes`              | string   | default: []                     |
| `comments`           | string   | default: []                     |
| `location`           | string   |                                 |
| `createdAt`          | Date     | default: new Date()             |
| `amount`             | Number   |                                 |
| `timestamp`          | Boolean  | required true                   |

# State
```js
{
  entities: {
    postMessage: {
      1: {
        title: "Luxury Suite",
        message: "3 guest, 2 bathrooms",
        tags: "$299",
        creator: "Ron Johnson",
        selectedFile: ".png",
        likes: ["3"],
        comments: ["Is this still available?", "Yes it is!"],
        location: "Daly City, SF, California",
        createdAt: "2013-11-20 at 11:30pm",
      
      },
      2: {
        title: "Luxury Double Suite",
        message: "3 guest, 2 bathrooms",
        tags: "$199",
        creator: "Jessica Lee",
        selectedFile: ".png",
        likes: ["2"],
        comments: ["Is this still available?", "Yes it is!"],
        location: "Berkeley, California",
        createdAt: "2013-11-20 at 11:30pm",
      
      },
     
    },
    users: {
      1: {
        id: "11",
        name: "Ron Johnson",    
        email: "ron@gmail.com",
        pic: '.png"
      },
     2: {
        id: "12",
        name: "Jessica Lee",    
        email: "jessica@gmail.com",
        pic: '.png"
      },
    },

  ui: {
    loading: true/false,
    modal: true/false
  },
  errors: {
    login: ["Incorrect username/password combination"],
    postForm: ["Post form  cannot be blank"],
  },
}
```
# Frontend Routes
+ `/`
  + `posts`
+ `/auth`
  + `signupForm`
  + `loginForm`
+ `/posts`
  + `postForm`
  + `editForm/:postMessageId`
+ `/posts/:postMessageId`
  + `PostComponent`

# Backend Routes

## API Endpoints

### `users`
+ `POST /signup` - sign up
+ `POST /signin` - login

### `post`
+ `GET /profile/:id` - gets post by user
+ `GET /search` - returns details based on query input
+  `GET / `   - gets all posts
+  `GET /:id` - gets posts details
+ `POST /` - creates a post
+ `PATCH /:id` - edits a post
+ `DELETE /:id` - removes a post

### `likes`
+ `PATCH /:id/likePost` - like/ unlike a post

### `comments`
+ `POST /:id/commentPost` - comment on a post


## Mobile Screenshots:
<img align="center" src="https://github.com/albertshay888/silkroad/blob/master/screenshots/mobile.png"  width="1200" height="300" />


## iPad Screenshots:
<img src="https://github.com/albertshay888/silkroad/blob/master/screenshots/ipad1.png" width="1000" height="450" />


## Desktop Screenshots:
<img src="https://github.com/albertshay888/silkroad/blob/master/screenshots/desktophome.jpg" width="800" height="550" />
<img src="https://github.com/albertshay888/silkroad/blob/master/screenshots/desktopmessage.jpg" width="800" height="550" />



