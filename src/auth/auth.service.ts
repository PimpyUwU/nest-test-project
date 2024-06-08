import { Injectable } from '@nestjs/common';
import {AuthPayloadDto} from "./dto/auth.dto";
import {JwtService} from "@nestjs/jwt";
import {DatabaseService} from "../database/database.service";
import {Prisma} from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(private jwtService : JwtService, private databaseService : DatabaseService) {}

    async validateUser(authPayload : AuthPayloadDto){
        console.log("service")
        const foundUser = await this.databaseService.users.findUnique({
            where : {
               email : authPayload.email
            }
        })

        //TODO : encryption
        if(authPayload.password === foundUser.password){
            const {password, name, ...user} = foundUser
            return this.jwtService.sign(user)
        }
    }
}
