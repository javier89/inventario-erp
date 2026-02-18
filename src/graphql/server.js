import {ApolloServer} from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { expressMiddleware } from '@apollo/server/express4';
import { context } from './context.js';
import prisma from '../config/prisma/prismaClient.js';

import cors from 'cors';
import bodyParser from "body-parser"; 

import { typeDefs, resolvers } from "./index.js";

export async function startGraphQLServer (app){
    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });
    
    //await server.start();

    const {url} = await startStandaloneServer(server,{
        context,
        listen:{port: 5501},
    });

    app.use(
        '/graphql',
        cors(),
        bodyParser.json(),
        expressMiddleware(server)
    );
    console.log(`🚀 GraphQL listo en ${url}`)
}
