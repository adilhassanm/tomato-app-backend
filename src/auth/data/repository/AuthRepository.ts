import { Mongoose } from "mongoose";
import IAuthRepository from "../../domain/IAuthRepository";
import User from "../../domain/User";
import { UserModel, UserSchema } from "../models/UserModel";

export default class AuthRepository implements IAuthRepository{
    constructor(private readonly client:Mongoose){

    }
    public async find1(email: string): Promise<User> {
        //users is a collection of users in mongo db
       const users=this.client.model<UserModel>('User',UserSchema)///users.this represents a user document fetched from mongo database
        // now we have access to our ---nameOfUserDoc--- document inside of our mongo db and also we have to pass the model,for expecting the info wht we are receiving
        const user = await users.findOne({
            email:email.toLowerCase()
        })
        
        //return a new user(domain User)

        //for checking possibility of no user
        if(!user) return Promise.reject('User not found')
        return new User(user.id,user.name,user.email,user.password ?? '',user.type)    //and will create new uSER from model info that is returned
            //? represents optional for returning new user,his we can get rid by if check as shown above
    }
    public async add(
        name: string, email: string, type: string,passwordHash?: string ): Promise<string> {
        const userModel=this.client.model<UserModel>('User',UserSchema)
        const savedUser = new userModel({
            type:type,
            name:name,
            email:email.toLowerCase(),
           
        })
        if (passwordHash) savedUser.password=passwordHash
         await savedUser.save()
        return savedUser.id
    }
    
}