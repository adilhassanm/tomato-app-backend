
import * as express from 'express'
import IAuthRepository from '../domain/IAuthRepository';
import IPasswordService from '../services/IPasswordService';
import ITokenService from '../services/ITokenService';
import SignInUseCase from '../usecases/SignInUseCase';
import AuthController from './AuthController';

export default class AuthRouter {
// now this is the router where lot of dependencies wil be configured and composed together

public static configure(
    authrepository:IAuthRepository,
    tokenService:ITokenService,
    passwordService:IPasswordService):express.Router { //static method that will returnan Express Router
    //inside this configure method we pass in all our dependencies
    //so to configure our router and our controller we will need 

    const router = express.Router()  //this is the object that express uses to determine the routes or paths that is to be executes based on http request

    let controller = AuthRouter.composeController(authrepository,tokenService,passwordService)
    //going to create another static method inside the router
    //now i will configure my route for signin
    router.post('/signin',(req,res)=> controller.signin(req,res))
    return router
    //here we hve configured my routes and setup dependencies for controller

}
//now static method

private static composeController(
    authRepository:IAuthRepository,
    tokenService:ITokenService,
    passwordService:IPasswordService
    ):AuthController{
        const signInUseCase = new SignInUseCase(authRepository,passwordService)
        const controller = new AuthController(signInUseCase,tokenService)
        return controller
        //now we have our Authrouter setup with post method to our signin
        // which will inturn execute signin method from our controller
    }

}
//Now we need to test this router whether it is working as expeccted
