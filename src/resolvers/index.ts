import { IResolvers } from 'graphql-tools';
import query from './query';

const resolvers: IResolvers = {
    ...query
};

export default resolvers;

/* 
Apollo Server necesita saber cómo completar datos para cada campo en su esquema para poder responder a las solicitudes de esos datos. Para lograr esto, utiliza resolutores.
Un resolutor es una función que se encarga de completar los datos de un solo campo en su esquema. Puede completar esos datos de la forma que usted defina, como por ejemplo, obteniendo datos de una base de datos de back-end o de una API de terceros.
Usted define todos los resolutores de su servidor en un solo objeto JavaScript (nombrado resolversarriba). Este objeto se llama mapa de resolución .
El mapa de resolución tiene campos de nivel superior que corresponden a los tipos de su esquema (como el Queryanterior).
Cada función de resolución pertenece al tipo al que pertenece su campo correspondiente.

Ver en https://www.apollographql.com/docs/apollo-server/data/resolvers/
 */