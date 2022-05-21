import User from "./User";

//here we will create a interface  (Purpose : Find users with emails,whether user exists and then find,add method to add user if it does not exists)
export default interface IAuthRepository{
    find1(email: string): Promise<User>//this method will return a promise which is same or equivalent to future in flutter
    //pass in properties of user i want to add
    add(name: string,email: string,passwordHash: string,type: string)
     : Promise<string>//returns promise that will be a string wich will represent the userid
}
//now we will be creating our signin