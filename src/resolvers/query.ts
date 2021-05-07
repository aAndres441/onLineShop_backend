/* import { IResolvers } from '@graphql-tools/utils'; */

import { IResolvers } from 'graphql-tools';
import { COLLECTIONS } from '../config/constants';


/* estos resolves seran para las querys en Playground */
const resolversQuery: IResolvers = {
    Query: {
        async users(_, __, { db }) {
            /* console.log(root);
            console.log(args);
            console.log(context);
            console.log(info); */
            try {
                return {
                    status: true,
                    message: 'Lista de usus cargado correctamente!',
                    users: await db.collection(COLLECTIONS.USERS).find().toArray()
                };
            } catch (error) {
                console.log(error);
                return { 
                    status:false,
                    message: 'Error al catgar Usuarios. Comprueba!',
                    users: []               
                };
            }

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