import IPasswordService from "../../services/IPasswordService";
import bcrypt from 'bcrypt'

export default class BcryptPasswordService implements IPasswordService{

    constructor(private readonly saltRounds: number = 10){}//INJECT DEPENDENCY CALLED SALT ROUND.HIGHER THE NUMBERSLOWER THE PROCESS AND MORE SECURE HASH

    //As understood methods which is basically function inside a class does nt need function keyword,but just functionname()

    hash1(password: string): Promise<String> {
        return bcrypt.hash(password,this.saltRounds)
    }
    compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password,hash)
    }


}