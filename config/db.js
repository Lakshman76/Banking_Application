require("dotenv").config();
const mongoose = require("mongoose");

const connectToDB = async() => {
   mongoose.connect(process.env.MONGODB_URL)
   .then((conn)=>{
    console.log("Database connected");
   })
   .catch((err)=>{
        console.log("hello",err);
   })
}

module.exports = connectToDB;