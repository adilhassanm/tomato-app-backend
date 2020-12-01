//Integration testing how application interacts with actual db,so it is slow,not recommended to have bunch of test in application,so will have just couple of test only


import AuthRepository from "../../../../src/auth/data/repository/AuthRepository"
import mongoose from "mongoose"
import dotenv from "dotenv"
import { expect } from "chai"
dotenv.config()//this allows process environ access  environment file

describe('AuthRepository',()=>{

    let client : mongoose.Mongoose
    let sut : AuthRepository
    
    
    //setup hooks

    beforeEach(()=>{
        //setup dependency
        client =new mongoose.Mongoose()
        const connectionStr = encodeURI(process.env.TEST_DB as string)//I want to environ variable to hold it instead of holding it here
        client.connect(connectionStr,{
            useNewUrlParser:true,
            useUnifiedTopology:true
            
                    })

        sut = new AuthRepository(client)
                })

    afterEach(() =>{
        client.disconnect()
    })

    it('should return user when email is found',async ()=>{
        //arrange
        const email = 'adil27jan@gmail.com'
        const password="adil1234"
        //act
        const result = await sut.find1(email)

        //assert
        expect(result).to.not.be.empty

    })

    it("should return user id when added to db",async ()=>{
        //arrange
        const user={
            name:"Alayna",
            email:"alayna@gmail.com",
            password:"password123",
            type:"email",
        }
        //act
        const result = await sut.add(
            user.name,
            user.email,
            user.password,
            user.type
        )
        //assert
        expect(result).to.not.be.empty
    })
    
    })