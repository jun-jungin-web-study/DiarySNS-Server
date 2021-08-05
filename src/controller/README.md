# DiarySNS Api Specifications

HTTP api specification document for **DiarySNS**

## Table of Contents

- [DiarySNS Api Specifications](#diarysns-api-specifications)
  - [Table of Contents](#table-of-contents)
  - [API Documentation](#api-documentation)
    - [User](#user)
      - [`POST /api/user/login`](#post-apiuserlogin)
      - [`POST /api/user`](#post-apiuser)
      - [`GET /api/user`](#get-apiuser)
      - [`PUT /api/user`](#put-apiuser)
      - [`Delete /api/user`](#delete-apiuser)
    - [Template](#template)
      - [`GET /?/:?`](#get-)

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

### Template

#### `GET /?/:?`

?

**Query Parameters**

| **Name** | **Type** | **Required?** | **Description** |
| -------- | -------- | ------------- | --------------- |
| ?        | ?        | ?             | ?               |

**Request Example**

```
{

}

```

**Response Example**

```

```
