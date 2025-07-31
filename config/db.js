import mongoose from "mongoose";

const connDB = async ()=>{
    try {
     await mongoose.connect(process.env.MONGO_URI);
     console.log('Mongo DB connected Succesfully')
        
    } catch (error) {
       console.log(`Mongo Db connection error ${error}`); 
    }
};

export default connDB;