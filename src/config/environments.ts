import dotenv from 'dotenv';

const environment = dotenv.config(
    {
        path:'./src/.env'
    }
);

/* comprobamos que no estamos en preoduccion solo en desarrollo */

if(process.env.NODE_ENV !== 'production'){
    if(environment.error){
        throw environment.error;
    }
}
    
    export default environment;