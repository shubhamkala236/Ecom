const mongoose = require('mongoose')

//using database locally

const connectDatabase = () =>{
    mongoose.connect(process.env.DB_URI,{useNewUrlParser: true, useUnifiedTopology: true})
    .then((data)=>{
        console.log(`MongoDb connected with server: ${data.connection.host}`);
    })
    //no require to use catch as unhandled promise rejection error is handeled on server.js
    // .catch((err)=>{
    //     console.log(err);
    // })
}

module.exports = connectDatabase;