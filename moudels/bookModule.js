import mongoose from "mongoose";
const bookschema=mongoose.Schema(
    {
        title:{
            type:String,
            require:true,
        },
        auther:{
            type:String,
            require:true,
        },
        bublichYear:{
            type:Number,
            require:true,
        }
    },
    {
        Timestamp:true
    }
    
)


export const Book = mongoose.model('Cat',bookschema);