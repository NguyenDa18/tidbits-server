const dotenv = require('dotenv');
dotenv.config();
const { connectDB } = require('./config/db');

const { ApolloServer, PubSub } = require('apollo-server');
const { typeDefs } = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const port = process.env.PORT || 8000;

// init PubSub pattern to pass in context
const pubsub = new PubSub();

const server = new ApolloServer({
    typeDefs,
    resolvers,

    // give resolvers access to req params
    context: ({ req }) => ({ req, pubsub })
});

const startServer = async () => {
    try {
        await connectDB();
        const res = await server.listen({ port });
        await console.log(`Server running at ${res.url}`);
    }
    catch (err) {
        console.error(`Error running server, ${err}`);
    }
};

startServer();