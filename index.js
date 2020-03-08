const dotenv = require('dotenv')
dotenv.config()
const { connectDB } = require('./config/db')

// import models
const Post = require('./models/Post')
const User = require('./models/User')

const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const port = 5000

const typeDefs = gql`
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }

    type Query {
        getPosts: [Post]
    }
`

const resolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find()
                return posts
            }
            catch (err) {
                throw new Error(err)
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const startServer = async () => {
    try {
        await connectDB()
        const res = await server.listen({ port })
        await console.log(`Server running at ${res.url}`)
    }
    catch (err) {
        console.error(`Error running server, ${err}`)
    }
}

startServer()