import {BadRequestException, Injectable} from '@nestjs/common';
import {AuthPayloadDto} from "./dto/auth.dto";
import {JwtService} from "@nestjs/jwt";
import {DatabaseService} from "../database/database.service";
import {Prisma} from "@prisma/client";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private jwtService : JwtService, private databaseService : DatabaseService) {}

    async validateUser(authPayload : AuthPayloadDto){
        const foundUser = await this.databaseService.users.findUnique({
            where : {
               email : authPayload.email
            }
        })

        if(await bcrypt.compare(authPayload.password, foundUser.password)){
            const {password, name, ...user} = foundUser
            return this.jwtService.sign(user)
        }
        else return null
    }

    async createUser(registrationPayload : Prisma.UsersCreateInput){
        return this.databaseService.$transaction(async (t) => {
            const user = await t.users.findUnique({
                where: {
                    email: registrationPayload.email
                }
            })

            if (user) {
                throw new BadRequestException("email is taken")
            } else {
                const salt = await bcrypt.genSalt()
                return t.users.create({data: {
                        email : registrationPayload.email,
                        name : registrationPayload.name,
                        password : await bcrypt.hash(registrationPayload.password, salt)
                    }
                });
            }
        });
    }
}
