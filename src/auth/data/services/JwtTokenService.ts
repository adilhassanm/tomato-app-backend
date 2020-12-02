import ITokenService from "../../services/ITokenService";
import jwt from 'jsonwebtoken'

export default class JwtTokenService implements ITokenService{
    encode(payload: string | object): string | object {
        throw new Error("Method not implemented.");
    }
    decode(token: string | object): string | object {
        throw new Error("Method not implemented.");
    }

}