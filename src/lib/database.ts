import MongoClient from 'mongodb';
import chalk from 'chalk';

class Database {
    async init(){ 
        //inicializamos BD, conectamos con variables de entorno .env
        const MONGO_DB = process.env.DATABASE || 'mongodb://localhost:27017/online-shop';
        const client = await MongoClient.connect(
            MONGO_DB,
            { 
                useNewUrlParser:true,
                useUnifiedTopology:true
            }
        );

        const db = client.db();

        if (client.isConnected()){
            console.log('**********Database*********');
            console.log(`STATUS: ${chalk.greenBright('ONLINE')}`);
            console.log(`NAME DB: ${chalk.greenBright(db.databaseName)}`);            
        }
        else{
            console.log('NO conecta');
            
        }
        return db;
    }
}
export default Database;