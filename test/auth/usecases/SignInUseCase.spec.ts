//general convention to name the test file
import 'mocha'
import chai,{expect } from 'chai'
import SignInUseCase from '../../../src/auth/usecases/SignInUseCase'
import IAuthRepository from '../../../src/auth/domain/IAuthRepository'
import IPasswordService from '../../../src/auth/services/IPasswordService'
import FakeRepository from '../helpers/FakeRepository'
import FakePasswordService from '../helpers/FakePasswordService'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
//to do our test we use describe from mocha

describe("SingnInUseCase",()=>{
    let sut: SignInUseCase
    let repository: IAuthRepository
    let passwordService: IPasswordService

    const user ={
        email: "adil27jan@gmail.com",
        id:"1234",
        name:'Adil',
        password:"$2bb2b2b2b2b2b22b2b2b2b2b2b2",
        type:"email",

    }

    //before each we need to prepare dependencies
    beforeEach(()=>{
        //create fake repository,instead of using mocha
        repository = new FakeRepository()
        //fake password service
       // passwordService = new FakePasswordService()
        sut = new SignInUseCase(repository,passwordService)
    })

    //first test

    it('should throw an error when user is not found',async ()=>{

        const user={email:'wrong@email.com',password:"1234"}
        //assert
        await expect(sut.execute(user.email,user.password)).to.be.rejectedWith('User not found')

    })

    it('should return user id when email and password is correct',async ()=>{
        //act
        const id =await sut.execute(user.email,user.password)
        //assert
        expect(id).to.be.equal(user.id)

    })

    it('should return user id when email is correct and type is not email',async ()=>{

       //act
       const id =await sut.execute(user.email,'')
       //assert
       expect(id).to.be.equal(user.id)

    })
})
//npm run test in command line will run all test in test folder which we dont want want,we must be able run each single ones
