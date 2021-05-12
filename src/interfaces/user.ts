export interface IUser {    
    id?: string;
    name: string;
    lastname:string;
    email:string;
    password:string;
    registerDate:string;
    birthday: string;
    role: string;
}

/* el id sera opcional pues añ hacer un insert no lo tendriamos
    y el rol de tipo Rol sera al final un string */