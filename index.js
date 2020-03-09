const dotenv = require('dotenv');
dotenv.config();
const { connectDB } = require('./config/db');

const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const port = 5000;

const server = new ApolloServer({
    typeDefs,
    resolvers,

    // give resolvers access to req params
    context: ({ req }) => ({ req })
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