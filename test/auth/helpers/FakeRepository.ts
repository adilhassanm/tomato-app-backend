import IAuthRepository from "../../../src/auth/domain/IAuthRepository";
import User from "../../../src/auth/domain/User";

export default class FakeRespitory implements IAuthRepository{

    public users = [
        {
        email: "adil27jan@gmail.com",
        id:"1234",
        name:'Adil',
        password:"$2bb2b2b2b2b2b22b2b2b2b2b2b2",
        type:"email",
        },
        {
            email: "tester@gmail.com",
            id:"1556",
            name:'Alayna',
            password:"",
            type:"google",
            
            },

    ]


    //implementation of IAuthRepository method
    public async find1(email: string): Promise<User> {
        const user=this.users.find(element =>element.email===email)//this is actually list/array.find method (default method of array in js) with this syntax of taking the element variable as parameter and using it in function calculation and return whatever after arrow as explained in this link . https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
        if(!user) return Promise.reject("User not found")
        return new User(
            user?.id,
            user?.name,
            user?.email,
            user?.password,
            user?.type)//here ? i am not sure,it is seems it is used for optional params

    }
    public async add(
        name: string,
        email: string,
        passwordHash: string,
        type: string
        ): Promise<string> {
        const min = 1000
        const max = 9999
        const id= (Math.floor(Math.random()*(+max - +min)) + +min).toString()
        this.users.push({email:email,id:id,name:name,password:passwordHash,type:type
        })
        return id
        
    }

}