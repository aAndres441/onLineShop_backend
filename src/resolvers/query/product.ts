/* import { IResolvers } from '@graphql-tools/utils'; */

import { IResolvers } from 'graphql-tools';

/* estos resolves seran para las querys en Playground */
const resolversProductQuery: IResolvers = {
    Query: {
        //empezamos con los tipos de productos
         products(){
             return false;
         }
    }
};

export default resolversProductQuery;

