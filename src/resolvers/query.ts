/* import { IResolvers } from '@graphql-tools/utils'; */

import { IResolvers } from 'graphql-tools';

const resolversQuery: IResolvers = {
    Query: {
        users(root, args, context, info) {
            console.log(root);
            console.log(args);
            console.log(context);
            console.log(info);
            
            return [
                {
                    id: 1,
                    name: 'Andres',
                    lastname: 'Arias',
                    email: '',
                    password: '',
                    registerDate: '',
                    birthday: ''
                }
            ];
        }
    }
};

export default resolversQuery;


/* lo veo desde graphqql
 "Identificador unico"
    id: ID!
    "Nombre de pila"
    name: String!
    "Apellido/s"
    lastname:String!
    "Correo de BD"
    email:String!
    "Cotraseña de la cuenta"
    password:String!
    "Fecha registro en BD"
    registerDate: String!
    "Fecha nacim.- solo > 18 años"
    birthday: String! */