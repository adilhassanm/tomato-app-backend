//our user class
export default class User{//syntax of creating class in ts,similar to other languages
    constructor(public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly password: string,
        public readonly type: string
        )//we can create all the fiels associated with this class from contructor itself.
        {

        }
}