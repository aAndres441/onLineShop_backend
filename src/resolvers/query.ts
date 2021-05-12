/* import { IResolvers } from '@graphql-tools/utils'; */

import { IResolvers } from 'graphql-tools';
import { COLLECTIONS, EXPIRETIME, MESSAGES } from '../config/constants';
import JWT from '../lib/jwt';
import bcrypt from 'bcrypt';
import jwt from '../lib/jwt';


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
                    users: await db
                        .collection(COLLECTIONS.USERS)
                        .find()
                        .toArray(),
                };
            } catch (error) {
                console.log(error);
                return {
                    status: false,
                    message: 'Error al catgar Usuarios. Comprueba!',
                    users: [],
                };
            }

        },
        // agrego lo de login(email: String!, password:String!): ResultLogin
        async login(_, { email, password }, { db }) {
            try {
                //verify email para TOKEN 
                const user = await db.
                    collection(COLLECTIONS.USERS)
                    .findOne({ email });
                if (!user) {
                    return {
                        status: true,
                        message: 'no existe usuario con ese email',
                        token: null
                    };
                }

                /*verify password para TOKEN , 
                aclaracion: no es necesario haccerlo aca, mejor el token null abajo*/

                /*    const passlVf = await db.
                   collection(COLLECTIONS.USERS)
                   .findOne({ password });
                   if(!passlVf){
                       return {
                           status: true,
                           message: 'Password incorrecto, vuelva a intentarlo',
                           token: null
                       };
                   } */

                // verifica credenciales del usu para el login
                //saco esta consulta para agregar el check de token hash
                /* const user = await db
                    .collection(COLLECTIONS.USERS)
                    .findOne({ email, password }); */

                //bcrypt.compareSync(myPassword, hash); // true

                const passwordCheck = bcrypt.compareSync(password, user.password);

                //borramos el password para no ver la info en jwt.io luego de copiar token playground
                if (passwordCheck !== null) { // o puede ser si usuario no es nulo user!==null. console.log('MOOOOO', user.password);
                    delete user.password;
                    delete user.birthday;
                    delete user.registerDate;
                    /* delete user.lastname; */
                }
                return {
                    status: true,
                    message:
                        !passwordCheck
                            ? 'Password y usuario incorrecto, sesion no iniciada'
                            : 'Usuario cargado correctamente!',
                    token:
                        !passwordCheck
                            ? null
                            : new JWT().sign({ user }, EXPIRETIME.H12), // llama ajwt sign, le podemos cambiar expiracion aca, sino seria 24hs por defecto si no pongo nada                    
                };
            } catch (error) {
                console.log(error);
                return {
                    status: false,
                    message: 'Error al cargar el usuario. Comprueba!',
                    user: null,
                    token: null
                };
            }
        }, 

        me(_,__,{token}){  //traemos la info del context token, verifica en jwt si caducado etc y retorna para usar en server 
           console.log('token ', token);
           //vf el token
           let info = new jwt().verify(token);
           if(info === MESSAGES.TOKEN_VERIFICATION_FAILED){
               return{
                   status: false,
                   message: info,
                   user:null
               };
           }
            return{
                status: true,
                message:'Usuario autenticado mediante el token',
                user:Object.values(info)[0]
            };
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