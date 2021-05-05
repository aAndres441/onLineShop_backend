
/* aca guardaremos todas las constantes y variables de entorno para luego usar */

import environment from './environments';

/* comprobamos que no estamos en produccion solo en desarrollo 
pues en produccion no es necesario inicializar variables de entorno*/

if(process.env.NODE_ENV !== 'production'){
    const env = environment;
}

export const SECRET_KEY = process.env.SECRET || 'le asigno la palabra secreta si n o tengo variables de entorno '
