import mongoose from "mongoose"
import { config } from "../config"

const dbConnection = async () => {
    try {
        
        await mongoose.connect( `mongodb+srv://${config.database.user}:${ config.database.password }@clusterdb.7pqgv1r.mongodb.net/${ config.database.db_name }` );

        console.log('Database online');
    } catch (error: any) {
        console.log( error );
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}

export {
    dbConnection,
}