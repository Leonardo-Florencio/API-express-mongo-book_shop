import mongoose from "mongoose";

async function conectaNoDatabase() {
    mongoose.connect(process.env.DB_CONNECTION_STRING); //variável de ambiente administrada pelo dotenv
    
    return mongoose.connection;
};

export default conectaNoDatabase;
