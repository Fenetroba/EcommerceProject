import mongoose from "mongoose";
const mongoConnecte=async () =>{
try {
     const connect =await mongoose.connect( process.env.MONGO_DB);
     console.log(`Mongoodb connected with ${connect.connection.host}`)
     
} catch (error) {
     console.log(`the error is occerd on the database  ${error.message}`)
     process.exit(1)
     
}
}
export default mongoConnecte;