import 'graphql-import-node';
import  resolvers from './../resolvers';
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLSchema } from 'graphql';


import  {loadFilesSync} from '@graphql-tools/load-files';
import  {mergeTypeDefs}  from '@graphql-tools/merge';
const loadedFiles = loadFilesSync(`${__dirname}/**/*.graphql`);//para cargar asyncronamente ficheros de extension graphql dentro de schema
const typeDefs = mergeTypeDefs(loadedFiles);//aca hacemos la mezcla

/* const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const loadedFiles = loadFilesSync(`${__dirname}/--/-.graphql`);
const typeDefs = mergeTypeDefs(loadedFiles); */



const schema: GraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export default schema;