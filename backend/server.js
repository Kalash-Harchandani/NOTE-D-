import dotenv from "dotenv";
import app from "./app/app.js";
import {connectDB} from "./config/database.js"

dotenv.config();

const PORT = process.env.PORT || 6005;


const startServer = async() =>{

    await connectDB();
    console.log("Connected DB")
    app.listen(PORT,()=>{
    console.log(`Server running live : http://localhost:${PORT}`);
    })
}

startServer();

