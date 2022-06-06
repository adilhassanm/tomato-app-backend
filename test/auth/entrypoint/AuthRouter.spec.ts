//this test wil be run on a live server using supertest
//install supertest npm i -D supertest,npm i -D @types/supertest

import IAuthRepository from "../../../src/auth/domain/IAuthRepository"
import express from 'express'
import FakeRespitory from "../helpers/FakeRepository"
import JwtTokenService from "../../../src/auth/data/services/JwtTokenService"
import BcryptPasswordService from "../../../src/auth/data/services/BcryptPasswordService"
import AuthRouter from "../../../src/auth/entrypoint/AuthRouter"
import  request  from 'supertest'
import { expect, use } from "chai"
//for our test
describe('AuthRouter',()=>{
    let repository:IAuthRepository
    let app: express.Application

    const user = {
        email:'adil27jan@gmail.com',
        id:'1234',
        name:'Adil',
        password:'$2bb2b2b2b2b2b22b2b2b2b2b2b2',
        type:'email'
    }

   


    beforeEach(()=>{
        repository = new FakeRespitory()
        let tokenService = new JwtTokenService('privateKey')
        let passwordService = new BcryptPasswordService()
        //CREATE SOME MIDDLEWARE FOR APP TO USE
        app=express()
        app.use(express.json())//express can parse json body,we were using req.body in controller,we need these steps to enable those

        app.use(express.urlencoded({extended:true}))

        //configure the router

        app.use('/auth',
        AuthRouter.configure(repository,tokenService,passwordService))
    })
//now since we have configured everything,let usrun some tets


it ('should return 404 when the user is not found',async()=>{
    await request(app).post('/auth/signin').send({}).expect(404)
    

})
it ("should return 200 and token when user is found",async() =>{
    await request(app)
    .post('/auth/signin')
    .send(user)
    .set('Accept','application/json')
    .expect('content-type', /json/)
    .expect(200)
    .then((res)=>{
        expect(res.body.auth_token).to.not.be.empty
    })
})
})