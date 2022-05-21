import ITokenService from "../services/ITokenService"
import SignInUseCase from "../usecases/SignInUseCase"
import * as express from 'express'


export default class AuthController{

    //we need a public method for signin purpose,method that will handle signin logic

    // for controller for its dependencies i uses signin usecase
    private readonly signInUseCase:SignInUseCase
    private readonly tokenService:ITokenService
    //constructor and instantiating the private readonly classs fields
    constructor(signInUseCase:SignInUseCase, tokenService:ITokenService){
        this.signInUseCase =signInUseCase
        this.tokenService=tokenService
    }

    //this method will be called using a express router,install express,which is our http server
    public async signin(req:express.Request,res:express.Response){
        //we will use these objects to fetch our parameters from our request and also to return a parameter from our response
        //between atry catch
        try{
            const {email1,password} = req.body  //typical way of parsng and getting request body's usual parameters of username and password
            return this.signInUseCase.execute(email1,password)
            .then((id:String)=>res.status(200).json({auth_token:this.tokenService.encode(id)}))
            .catch((err:Error)=>res.status(404).json({error:err.message}))
        
        }
        catch(err){
            return res.status(400).json({error:err})

        }

        //there we have ur signin method that will be executed on our controller
        //whenever user requests a signin rout
        


        
    }
}
