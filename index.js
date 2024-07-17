import express from "express";
import mongoose from 'mongoose';
import { PORT , mongodb} from './config.js';
import router from "./expressRouter/routers.js";
import cors from "cors";
const app =express()
app.use(cors())
app.use(express.json());
app.get('/',(req,res)=>{
console.log(req)
return res.status(234).send('welcom to mern stack')
})

app.use('/books',router)

mongoose
.connect(mongodb)
.then(()=>{
console.log('app connected to dataBase');
app.listen(PORT,()=>{
console.log(`your app is running on port ${PORT}`)
})
})
.catch((error)=>{
    console.log(error);
});