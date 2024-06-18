import {PassportStrategy} from "@nestjs/passport";
import {Strategy, ExtractJwt} from "passport-jwt";
import {Injectable} from "@nestjs/common";
import {Request} from 'express'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor() {
        super({
            jwtFromRequest : ExtractJwt.fromExtractors([
                JwtStrategy.extractJWT
            ]),
            ignoreExpiration : true,
            secretOrKey : 'lol'
        });
    }

    private static extractJWT(req: Request){
        if (
            req.cookies &&
            'jwt' in req.cookies
        ) {
            return req.cookies.jwt
        }
        return null;
    }


    async validate(payload) {
       return payload
    }
}