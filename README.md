# GraphQL Server : PostBoard API

## Quickstart
- `npm i`
- create DB in MongoDB Atlas [video](https://www.youtube.com/watch?v=71-CtIcmDJQ)
- create .env file and use .env_default as template, fill in the placeholders
- `npm start`
- Use GraphiQL at http://localhost:5000 (or whatever port chosen) to play with


## Test calls
- Don't forget to use Bearer token for auth like so in HTTP Headers:
```
{
  "Authorization": "Bearer <JWT from login>"
}
```

### Register
```graphql
mutation {
  register(registerInput: {
    username: "beck",
    password: "password123",
    confirmPassword: "password123",
    email: "beck@fakemail.com"
  }) {
    id
    username
  }
}
```

### Login
```graphql
mutation {
  login(username: "beck", password: "password123") {
    id
    username
    token
  }
}
```

### GET Posts
```graphql
query {
  getPosts {
    id
    body
  }
}
```

### Add Comment
```graphql
mutation {
  createComment(postId: "<id>", body: "First comment") {
    id
    body
    comments {
      id
      createdAt
    }
  }
}
```

### Delete Comment
```graphql
mutation {
  deleteComment(commentId: "<commentid>", postId: "<postid>") {
    id
    comments {
      id
      username
      body
    }
  }
}
```