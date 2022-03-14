export class Comment {
    public Name: string;
    public emailaddress: string;
    public id: string;
    public msg: string;
    
    constructor(Name: string, email: string, id: string, msg: string) {
        this.Name = Name;
        this.emailaddress = email;
        this.id = id;
        this.msg = msg
    }
  }