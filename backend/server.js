const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

//Handling uncaught Error
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught Exception promise rejection`);
    process.exit(1);

})

//config 
dotenv.config({path:'backend/config/config.env'});


//Connect Database after dotenv to get env values in database
connectDatabase();




const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});


//Unhandled Promise rejection Error -- syntax of dotenv file wrong
process.on("unhandledRejection",err =>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);

    server.close(()=>{
        process.exit(1);
    });
});