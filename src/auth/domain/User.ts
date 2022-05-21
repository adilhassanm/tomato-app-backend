//our user class
export default class User{//syntax of creating class in ts,similar to other languages
    constructor(
        public readonly id: string,  //readonly prevent assigmnet of variables outside of contructor
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly type: string //authentication type
        )//we can create all the fields associated with this class from contructor itself.Advantage of TS
        {

        }
}