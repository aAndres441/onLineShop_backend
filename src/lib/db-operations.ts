import { Db } from 'mongodb';
import { COLLECTIONS } from '../config/constants';

/**
 * Obtenderemos el id del nuevo usuario
 * @param database base de datos con la que estamos trabajando
 * @param collection donde queremos buscar el ultimo element
 * @param sort con que propiedad queremos ordenarlo <prop>-1
 * @returns comprobamos el ultimo y asignamos su id, 
todo lo que esta en la funcion de flecha como parametros es lo que pide en su definicion
*/

export const asignDocumentId = async (
    database: Db,
    collection: string,
    sort: object = { registerDate: -1 }
) => {

    const lastElement = await database
        .collection(collection)
        .find()
        .limit(1)
        .sort(sort)
        .toArray();
    if (lastElement.length === 0) {
        return 1;
    }
    return lastElement[0].id + 1;
};


export const findOneElement = async (
    database: Db,
    collection: string,
    filter: object
) => {
   return await database
        .collection(collection)
        .findOne(filter);
};{}

export const insertOneElement = async (
    database: Db,
    collection: string,
    doc:object
) =>{
    return await database
    .collection(collection)
    .insertOne(doc);
};

export const insertManyElements = async (
    database: Db,
    collection: string,
    docs:Array<object>
) =>{
    return await database
    .collection(collection)
    .insertMany(docs);
};

export const getElements = async(
    database: Db,
    collection: string,
    filter:object = {} //puede ser vacio
)=>{
    return await database
     .collection(collection)
     .find(filter)
     .toArray();
};