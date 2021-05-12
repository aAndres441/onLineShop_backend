import { EXPIRETIME, MESSAGES, SECRET_KEY } from '../config/constants';
import jwt from 'jsonwebtoken';
import { IJwt } from '../interfaces/jwt.interface';

class JWT {

    private secretKey = SECRET_KEY as string;


    /* FIRMA jwt con 24 horas para caducidad en payload, aunque podriamos cambiarlo en parametro de query login token*/
    sign(data: IJwt, expiresIn: number = EXPIRETIME.H24) {
        return jwt.sign(
            {user:data.user},
            this.secretKey,
            {expiresIn } 
        );
    }

    // CONFIRMACION si no es valido o caducado
    verify(token:string){
        try {
            return jwt.verify(token,this.secretKey);
        } catch (e) {
            // console.log(MESSAGES.TOKEN_VERIFICATION_FAILED , e);
            return MESSAGES.TOKEN_VERIFICATION_FAILED;            
        }
    }

}
 export default JWT;