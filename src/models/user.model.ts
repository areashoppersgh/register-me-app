export class User {
    constructor(
        public username: string,
        public password: string,
        public email?: string,
        public gender?: string,
        public maritalStatus?: string,
        public homeTown?: string,      
        public position?: string,
        public latitude?: any,
        public longitude?: any,
        public findMeId?: any,
        public location?: any,) { }
}
