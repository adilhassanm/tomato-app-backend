import IAuthRepository from "../domain/IAuthRepository";
import IPasswordService from "../services/IPasswordService"

export default class SignInUseCase{
    //for each dependencies I want a authrepository
    constructor(private authRepository:IAuthRepository,private passwordService: IPasswordService){}//this IPassWord service will be an application service specific to this application
    //A PUBLIC METHOD TO EXECUTE THIS usecase,

    public async execute(email: string,password: string):Promise<string>{

        const user =await this.authRepository.find1(email)

        if(password==='' && user) 
            return user.id //here in this case when user is authenticated using google,only email field will be sent ,password is empty as authentication happen thru google or other auth service
        //if password is sent,it should be comopared with password in repository,but password is storedas hash and require seperate service to prse it
        //we will use that service to compare password
        
        if(!(await this.passwordService.compare(password,user.password))){
            return Promise.reject("Invalid email or password") //The static Promise.reject function returns a Promise that is rejected. For debugging purposes and selective error catching,Reason why this Promise rejected
                    }
                    return user.id
                
    }
} 