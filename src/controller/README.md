# DiarySNS Api Specifications

HTTP api specification document for **DiarySNS**

## Table of Contents

- [DiarySNS Api Specifications](#diarysns-api-specifications)
  - [Table of Contents](#table-of-contents)
  - [Return Data types](#return-data-types)
    - [User](#user)
    - [Post](#post)
    - [Comment](#comment)
    - [Error](#error)
  - [Status codes](#status-codes)
  - [Authentication](#authentication)
  - [API Documentation](#api-documentation)
    - [User](#user-1)
      - [`POST /api/user/login`](#post-apiuserlogin)
      - [`POST /api/user`](#post-apiuser)
      - [`GET /api/user`](#get-apiuser)
      - [`PUT /api/user`](#put-apiuser)
      - [`Delete /api/user`](#delete-apiuser)
    - [Post](#post-1)
      - [`GET /api/post/:postid`](#get-apipostpostid)
      - [`GET /api/post/`](#get-apipost)
      - [`POST /api/post`](#post-apipost)
      - [`PUT /api/post/:postid`](#put-apipostpostid)
      - [`DELETE /api/post/:postid`](#delete-apipostpostid)
      - [`POST /api/post/:postid/like`](#post-apipostpostidlike)
      - [`POST /api/post/:postid/unlike`](#post-apipostpostidunlike)
    - [Comment](#comment-1)
      - [`GET /api/post/:postid/comment`](#get-apipostpostidcomment)
      - [`POST /api/post/:postid/comment`](#post-apipostpostidcomment)
      - [`PUT /api/post/:postid/comment/:commentid`](#put-apipostpostidcommentcommentid)
      - [`DELETE /api/post/:postid/comment/:commentid`](#delete-apipostpostidcommentcommentid)
    - [Tag](#tag)
      - [`GET /api/tag`](#get-apitag)

<a name="return_data_types"></a>

## Return Data types

### User

```
{
  "user": {
    "email": string,
    "token": string,
    "nickname": string,
    "description": string | null,
    "profileimage": string | null
  }
}
```

### Post

```
{
  "post": {
    "id" : int
    "title": string,
    "author": string,
    "body": string,
    "isPublic" : boolean,
    "font" : null|"not yet implemented",
    "backGroundPaper" : "basic"|"others not yet implemented",
    "likes" : int,
    "tags" : string[],
    "createdAt" : "yyyy-mm-dd hh:mm:ss.ssssss",
    "updatedAt" : "yyyy-mm-dd hh:mm:ss.ssssss",
  }
}
```

### Comment

```
{
  "comment": {
    "id": int
    "author": string,
    "body": string,
    "createdAt": "yyyy-mm-dd hh:mm:ss.ssssss",
    "updatedAt": "yyyy-mm-dd hh:mm:ss.ssssss"
  }
}
```

### Error

Status code should be 442

```
{
  "error": {
    "message": "required field not provided"
  }
}
```

## Status codes

| code | description                                      |
| ---- | ------------------------------------------------ |
| 200  | Successful response                              |
| 442  | error                                            |
| 401  | Request requires authentication but not provided |
| 403  | Requests user is not allowed to perfrom          |
| 404  | not found request                                |

## Authentication

For authentication, we use `jwt`. If an api you want to use requires authentication, add `"Authorization": Bearer {jwt}` to header for request.

<a name="api_documentation"></a>

## API Documentation

<a name="user_queries"></a>

### User

#### `POST /api/user/login`

Retrieve profile of current user. No Authentication needed.

**Request Example**

```
{
  "user": {
    "email": "jungin@kaist.ac.kr",
    "password": "passpass123"
  }
}

```

**Response Example**

```
{
  "user": {
    "email": "jungin@kaist.ac.kr",
    "token": "jwt token",
    "nickname": "jungin",
    "description": "I am a student studying CS :)",
    "profileimage": null
  }
}

```

#### `POST /api/user`

Register a user. `email`, `nickname`, `password` field is required.
No authentication is required.

**Request Example**

```
{
  "user": {
    "email": "jungin@kaist.ac.kr",
    "nickname": "jirhee",
    "password": "passpass123"
  }
}

```

**Response Example**

```
{
  "user": {
    "email": "jungin@kaist.ac.kr",
    "token": "jwt token",
    "nickname": "jungin",
    "description": null,
    "profileimage": null
  }
}

```

#### `GET /api/user`

Get current user's data. Authentication needed.

**Response Example**

```
{
  "user": {
    "email": "jungin@kaist.ac.kr",
    "token": "jwt token",
    "nickname": "jungin",
    "description": null,
    "profileimage": null
  }
}
```

#### `PUT /api/user`

Update current user. Authentication is required.

Accepted fields: nickname, password, image, description.

**Request Example**

```
{
  "user": {
    "nickname": "new nickname",
    "password": "new password",
    "image": "new image",
    "description": "new description",
  }
}
```

**Response Example**

```
{
  "user": {
    "email": "jungin@kaist.ac.kr",
    "token": "jwt token",
    "nickname": "updated nickname",
    "description": "updated desc",
    "profileimage": "updated image"
  }
}
```

#### `Delete /api/user`

Delete current user. No parameters required

Authentication is required.

Returns deleted user.

**Response Example**

```
{
  "user": {
    "email": "jungin@kaist.ac.kr",
    "token": "jwt token",
    "nickname": "jungin",
    "description": null,
    "profileimage": null
  }
}

```

### Post

#### `GET /api/post/:postid`

Get post by id. Authentication needed.

**Request Example**

```
no request needed
```

**Response Example**

```
{
  "post": {
    "id" : postid
    "title": "Good day at Madrid",
    "author": "Jun",
    "body": "I had fun at madrid",
    "isPublic" : true,
    "font" : null,
    "backGroundPaper" : "basic",
    "likes" : 10,
    "tags" : ["spain", "madrid", "travel"],
    "createdAt" : "2021-08-10 15:07:17.546598",
    "updatedAt" : "2021-08-10 15:07:17.546598",
  }
}

```

#### `GET /api/post/`

Get most recent posts of a user. Authentication is optional. If not authenticated, it will fetch only public posts.

**Query Parameters**

| **Name**        | **Type** | **Required?**                     | **Description**                                                                                                                                                                                                                      |
| --------------- | -------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `limit`         | `int`    | yes                               | Decides number of posts to fetch                                                                                                                                                                                                     |
| `offset`        | `string` | no (default is current Datetime ) | Decides offset of posts from which will be fetched. fetched.                                                                                                                                                                         |
| `currentUserId` | `int`    | no                                | Used to identify who is requesting. If userid and this field matches (i.e. asking for posts of myself), private posts will be fetched. If not, only public posts will be fetched. If the user is unsigned, leave this field as blank |
| `tag`           | `string` | no                                | Filter by tag. filter.                                                                                                                                                                                                               |
| `author`        | `string` | no                                | Filter by author.                                                                                                                                                                                                                    |

**Request Example**

```
no request needed
```

**Response Example**

```
{
  "posts":[
      {
        "post":{
          "id" : 0
          "title": "Good day at Madrid",
          "author": "Jun",
          "body": "I had fun at madrid",
          "isPublic" : true,
          "font" : null,
          "backGroundPaper" : "basic",
          "likes" : 10,
          "tags" : ["spain", "madrid", "travel"],
          "createdAt" : "2021-08-10 15:07:17.546598",
          "updatedAt" : "2021-08-10 15:07:17.546598",
        }
      },
      {
        "post":{
          "id" : 1
          "title": "Good day at Seoul",
          "author": "Jun",
          "body": "I had fun at Seoul",
          "isPublic" : true,
          "font" : null,
          "backGroundPaper" : "basic",
          "likes" : 10,
          "tags" : ["Seoul", "travel"],
          "createdAt" : "2021-08-11 15:07:17.546598",
          "updatedAt" : "2021-08-11 15:07:17.546598",
        }
      }
  ],
  "count" : 2,
  "Datetimefrom" : <Datetime string>,
  "Datetimeto" : <Datetime string>,
}
```

#### `POST /api/post`

Create a post. Authentication needed.

- `title`, `body`, `tags`, `isPublic`, `font`, `backGroundPaper` fields are required.

**Request Example**

```
{
  post: {
    "title": "First day at Seoul",
    "body": "It was fun!",
    "tags": ["Seoul", "travel"],
    "isPublic": false,
    "font": null,
    "backGroundPaper": "basic"
  }
}
```

**Response Example**

```
{
  "post":{
    "id" : 0
    "title": "First day at Seoul",
    "author": "Jun",
    "body": "It was fun!",
    "isPublic" : false,
    "font" : null,
    "backGroundPaper" : "basic",
    "likes" : 0,
    "tags" : ["Seoul", "travel"],
    "createdAt" : "2021-08-10 15:07:17.546598",
    "updatedAt" : "2021-08-10 15:07:17.546598",
  }
}
```

#### `PUT /api/post/:postid`

Edit a post. Authentication needed.

- `title`, `body`, `tags`, `isPublic`, `font`, `backGroundPaper` can be given.

**Request Example**

```
{
  post: {
    "title": "newtitle",
    "body": "newbody",
    "tags": ["newtag1", "newtag2", "newtag3"],
    "isPublic": true,
    "font": null,
    "backGroundPaper": "basic"
  }
}
```

**Response Example**

```
{
  "post":{
    "id" : 0
    "title": "newtitle",
    "author": "Jun",
    "body": "newbody",
    "isPublic" : true,
    "font" : null,
    "backGroundPaper" : "basic",
    "likes" : 0,
    "tags" : ["newtag1", "newtag2", "newtag3"],
    "createdAt" : "2021-08-10 15:07:17.546598",
    "updatedAt" : "2021-08-11 15:07:17.546598",
  }
}
```

#### `DELETE /api/post/:postid`

Delete a post. Authentication needed.

**Request Example**

```
no request needed
```

**Response Example**

Returns deleted post.

```
{
  "post":{
    "id" : postid
    "title": "newtitle",
    "author": "Jun",
    "body": "newbody",
    "isPublic" : true,
    "font" : null,
    "backGroundPaper" : "basic",
    "likes" : 0,
    "tags" : ["newtag1", "newtag2", "newtag3"],
    "createdAt" : "2021-08-10 15:07:17.546598",
    "updatedAt" : "2021-08-11 15:07:17.546598",
  }
}
```

#### `POST /api/post/:postid/like`

Like a post. Authentication needed.

**Request Example**

```
no request needed
```

**Response Example**

Returns liked post.

```
{
  "post":{
    "id" : postid
    "title": "newtitle",
    "author": "Jun",
    "body": "newbody",
    "isPublic" : true,
    "font" : null,
    "backGroundPaper" : "basic",
    "likes" : 1,
    "tags" : ["newtag1", "newtag2", "newtag3"],
    "createdAt" : "2021-08-10 15:07:17.546598",
    "updatedAt" : "2021-08-11 15:07:17.546598",
  }
}
```

#### `POST /api/post/:postid/unlike`

Unlike a post. Authentication needed.

**Request Example**

```
no request needed
```

**Response Example**

Returns unliked post.

```
{
  "post":{
    "id" : postid
    "title": "newtitle",
    "author": "Jun",
    "body": "newbody",
    "isPublic" : true,
    "font" : null,
    "backGroundPaper" : "basic",
    "likes" : 0,
    "tags" : ["newtag1", "newtag2", "newtag3"],
    "createdAt" : "2021-08-10 15:07:17.546598",
    "updatedAt" : "2021-08-11 15:07:17.546598",
  }
}
```

### Comment

#### `GET /api/post/:postid/comment`

Get list of most recent comments. No authentication required.

**Query Parameters**

| **Name** | **Type** | **Required?**      | **Description**                            |
| -------- | -------- | ------------------ | ------------------------------------------ |
| `limit`  | `int`    | no (dedault is 10) | Number of comments to fetch                |
| `offset` | `int`    | no (dedault is 0)  | Offset from which comments will be fetched |

**Request Example**

```
no request required
```

**Response Example**

```
{
  "comments":[
    {
      "comment": {
        "id": 0,
        "author": "jungin1",
        "body": "This is great!",
        "createdAt": "2011-03-11 08:30:11.123144",
        "updatedAt": "2012-03-11 08:30:11.123144"
      }
    },
    {
      "comment": {
        "id": 0,
        "author": "jungin2",
        "body": "This is great!!!!!!",
        "createdAt": "2013-03-11 08:30:11.123144",
        "updatedAt": "2014-03-11 08:30:11.123144"
      }
    }
  ],
  "count": 2
}
```

#### `POST /api/post/:postid/comment`

Create a comment. Authentication required.

**Request Example**

```
{
  "comment": {
    "body": "This is great!!!!!!"
  }
}
```

**Response Example**

```
{
  "comment": {
    "id": 0,
    "author": "jungin2",
    "body": "This is great!!!!!!",
    "createdAt": "2013-03-11 08:30:11.123144",
    "updatedAt": "2014-03-11 08:30:11.123144"
  }
}
```

#### `PUT /api/post/:postid/comment/:commentid`

Edit a comment. Authentication required. Author of the comment can use this.

**Request Example**

```
{
  "comment": {
    "body": "This is gggggrrrrrreat!!!!!!"
  }
}
```

**Response Example**

```
{
  "comment": {
    "id": 0,
    "author": "jungin2",
    "body": "This is gggggrrrrrreat!!!!!!",
    "createdAt": "2013-03-11 08:30:11.123144",
    "updatedAt": "2021-08-11 08:30:11.123144"
  }
}
```

#### `DELETE /api/post/:postid/comment/:commentid`

Delete a comment. Authentication required. Author of the article or author of the comment can use this.

**Request Example**

```
no request required
```

**Response Example**
Deleted comment is returned

```
{
  "comment": {
    "id": commentid,
    "author": "jungin2",
    "body": "This is gggggrrrrrreat!!!!!!",
    "createdAt": "2013-03-11 08:30:11.123144",
    "updatedAt": "2021-08-11 08:30:11.123144"
  }
}
```

### Tag

#### `GET /api/tag`

Get list of all tags.

```
{
  "tags": ["tag1", "tag2", "tag3"]
}

```
