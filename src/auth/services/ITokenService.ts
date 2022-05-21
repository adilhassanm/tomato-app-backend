export default interface ITokenService{
    encode(payload: string | object): string | object//payload is just name of a variable
    decode(token: string | object):string | object

}