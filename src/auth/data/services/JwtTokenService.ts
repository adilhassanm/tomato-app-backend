import ITokenService from "../../services/ITokenService";
import jwt from 'jsonwebtoken'

export default class JwtTokenService implements ITokenService{
    constructor(private readonly privateKey:string){}
    encode(payload: string | object): string | object {
       
        let token = jwt.sign({data:payload},this.privateKey,{issuer:'com.fodapp',expiresIn:'1h'})
        return token
    }
    decode(token: string ): string | object {//token cannot be object but a string
        try {
            const decoded = jwt.verify(token,this.privateKey)
            return decoded
            
        } catch (error) {return 'Invallid Token'}
    }

}