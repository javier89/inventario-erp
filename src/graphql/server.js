import {ApolloServer} from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { context } from './context.js';


import cors from 'cors';
import bodyParser from "body-parser"; 

import { typeDefs, resolvers } from "./index.js";

export async function startGraphQLServer (app){
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    await server.start();
    
    app.use(
        '/graphql',
        cors(),
        bodyParser.json(),
        expressMiddleware(server,{
            context,
            listen: { port: 5501 },
        })
    );
    console.log(`🚀 GraphQL listo en localhost:5501`)
}

