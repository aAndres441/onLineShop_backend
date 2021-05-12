
/* aca guardaremos todas las constantes y variables de entorno para luego usar */

import environment from './environments';

/* comprobamos que no estamos en produccion solo en desarrollo 
pues en produccion no es necesario inicializar variables de entorno*/

if(process.env.NODE_ENV !== 'production'){
    const env = environment;
}

/* las variables de entorno estan en .env, en caso de no tener .env, usaria el string */

export const SECRET_KEY = process.env.SECRET || 'EstaEsLaPalabraSecretaPorSiNoTengoVariablesPuntoEnv';

export enum COLLECTIONS {
    USERS='users' ,
    CUSTOMER='client',
    PRODS='products'
}

export enum MESSAGES {
    TOKEN_VERIFICATION_FAILED = 'Token no valido, debe iniciar sesion de nuevo'
}

/* nuestro tiempo caducidad H=horas, D=dias, M= minutos*/
export enum EXPIRETIME {
    H1 = 60*60,
    H12 = 12*H1,
    H24 = 24*H1,
    M15 = H1/4,
    M5 = H1/30,
    D3 = H24*2
}