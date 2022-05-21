//application service abstraction - will be later implemented in our infra/data layer,abstraction of password services and implementation will be later
//will use library bcrypt for hashing and comparison

export  default interface IPasswordService {
    hash1(password: string):Promise<String>//first method hash,which accepts password as rawstring and generate hash
    compare(password: string, hash: string):Promise<boolean>//this method will take in raw password and hash string compare using some algo and determines the boolean
     
}