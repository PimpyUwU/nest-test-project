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
        return this.databaseService.$transaction(async (t) => {
            const foundUser = await t.users.findUnique({
                where : {
                    email : authPayload.email
                }
            })

            if(!foundUser){
                return null
            }

            if(await bcrypt.compare(authPayload.password, foundUser.password)){
                return this.signToken(foundUser)
            }
            else return null
        });
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
                const createdUser = await t.users.create({data: {
                        email : registrationPayload.email,
                        name : registrationPayload.name,
                        password : await this.hashPassword(registrationPayload.password)
                    }
                });

                return this.signToken(createdUser)
            }
        });
    }

    async signToken(userData : Prisma.UsersCreateInput){
        const {password, Posts, ...user} = userData

        return this.jwtService.sign(user)
    }

    private async hashPassword(password : string){
        const salt = await bcrypt.genSalt()

        return bcrypt.hash(password, salt)
    }
}
