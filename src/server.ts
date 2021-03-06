
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { createServer } from 'http';
import environments from './config/environments';
import { ApolloServer } from 'apollo-server-express';
import schema from './schema';
import expressPlayground from 'graphql-playground-middleware-express';
import Database from './lib/database';
import { IContext } from './interfaces/context';

if(process.env.NODE_ENV !== 'production'){
    const env = environments;
    console.log('----Desde server hacia .env ----- ');    
    console.log(env);    
}

async function init() {
    const app = express();
    app.use(cors());
    app.use(compression());

    const database = new Database();
    const db = await database.init(); 

    console.log('Inicia DB');
    
    //const context = {db};  usamos el de abajo por cambios al prgresar curso con token en query me:

    const context = async ({req, connection}: IContext)=>{ /*si es definido va a heders sino es subscription de connection  */
        const token = (req) ? req.headers.authorization : connection.authorization;
        return {db, token};
    };

    const server = new ApolloServer({
        schema,
        introspection: true,
        context
    });

    server.applyMiddleware({app});

    app.get('/', expressPlayground({
        endpoint:'/graphql'
    }));
    const httpServer = createServer(app);
    const PORT = process.env.PORT || 2002;
    httpServer.listen(
        {
            port: PORT,
        },
        () => console.log('Server.ts: createServer', `http://localhost:${PORT} API`) 

        //abro navegador con este puerto.OJO poner comillas invertidas   
    );
}
//llamo a funcion async

init();


/* ///////////////////////// */
/* 
configuracion de las variables de entorno (lectura)

 comprobamos que no estamos en produccion solo en desarrollo 
pues en produccion no es necesario inicializar variables de entorno

if(process.env.NODE_ENV !== 'production'){
    const env = environments;
    console.log(env);    
}

async function init() {
    const app = express();

    peticiones de origen cruzado
    app.use(cors());

    para comprimir request de la aplicacion
    app.use(compression());

    inicializamos la BD para a??adirla al cotexto y luego al ApolloServer

    inicializamos clase database.
    const database = new Database();

    inicializamos la configuracion de la BD
    const db = await database.init(); await pues init es asyncrona
    

    const server = new ApolloServer({
        schema,
        introspection: true,
        context: {db}
    });

    server.applyMiddleware({app});

     al entrar al path principal nos redireccinara al enpoint
    app.get('/', expressPlayground({
        endpoint:'/graphql'
    }));

    const httpServer = createServer(app);
    const PORT = process.env.PORT || 2002;

    httpServer.listen(
        {
            port: PORT,
        },
        () => console.log(`http://localhost:${PORT} API`) 

        abro navegador con este puerto.OJO poner comillas invertidas   
    );
}
llamo a funcion async

init();


 */
/* ********************** */

