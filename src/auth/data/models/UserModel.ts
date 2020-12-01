//in this usermodel will represent a mongo document,install mongodb
//here interface does not represent  a contract but just represent

import * as mongoose from "mongoose";

export interface UserModel extends mongoose.Document{
    //type fields that document should hold
    type: string
    name:string
    email:string
    password:string
}
//export mongo db schema
export const UserSchema = new mongoose.Schema({
    type:{type:String,required:true}, //HERE THE String type is a mongo db type with capital S
    name:String,
    email:{type:String,required:true},
    password:{type:String,required:true},


})

//certain charecteristics that allow you to validate the data using the schema
