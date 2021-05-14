/* import { IResolvers } from '@graphql-tools/utils'; */

import { IResolvers } from 'graphql-tools';
import { COLLECTIONS } from './../../config/constants';
import bcrypt from 'bcrypt';
import { asignDocumentId, findOneElement, insertOneElement } from '../../lib/db-operations';

const resolversUserMutation: IResolvers = {
    Mutation: {
        async register(_, { user }, { db }) {
            //en db iria context de server con el mismo nombre ,const context = {db};
            //comprobamos que el ususario no existe
            const userCheck = await findOneElement(db, COLLECTIONS.USERS, { email: user.email });
            if (userCheck !== null) {
                return {
                    status: false,
                    message: `Mail ${user.email} ya existe y no puedes registrarte`,
                    user: null
                };
            }

            /* comprobamos el ultimo y asignamos su ID en lib > db-operations */
            
            user.id = await asignDocumentId(db, COLLECTIONS.USERS, { registerDate: -1 });

            /* asignamos registerDate en formato iSO */

            user.registerDate = new Date().toISOString();

            //Encriptacion de password
            /*  const salt = bcrypt.genSaltSync(saltRounds);
                const hash = bcrypt.hashSync(myPassword, salt);
                salt es por defecto 10 pero yo agrego un numero x  */

            user.password = bcrypt.hashSync(user.password, 10);

            /* guardar el documento (registro) en la coleccion */
            return await insertOneElement(db,COLLECTIONS.USERS,user)
                .then(
                    async () => {
                        /* return user; */
                        return {
                            status: true,
                            message: 'IMMMPECCA',
                            user
                        };
                    }).catch((err: Error) => {
                        console.log(err.message);
                        /* return null; */

                        return {
                            status: false,
                            message: 'Error inesperado, No podes ser el hombre nuclear',
                            user: null
                        };

                    });
        }
    }
};

export default resolversUserMutation;

