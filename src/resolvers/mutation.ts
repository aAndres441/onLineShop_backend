/* import { IResolvers } from '@graphql-tools/utils'; */

import { IResolvers } from 'graphql-tools';
import { COLLECTIONS } from '../config/constants';

const resolversMutation: IResolvers = {
    Mutation: {
        async register(_, { user }, { db }) {
            /* comprobamos el ultimo y asignamos su id */
            const lastUser = await db.collection(COLLECTIONS.USERS).
                            find().
                            limit(1).
                            sort({registerDate:-1}).toArray();
            if(lastUser.length === 0){
                user.id = 1;
            }else{
                user.id = lastUser[0].id +1;
            }

            /* asignamos registerDate en formato iSO */
            user.registerDate = new Date().toISOString();

            /* guardar el documento (registro) en la coleccion */
            return await db.
            collection(COLLECTIONS.USERS).
            insertOne(user).
            then(async() =>{
                return user;
            }).catch((err:Error)=>{
                console.log(err.message);
                return null;
            });
        }
    }
};

export default resolversMutation;


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