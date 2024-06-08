import { Injectable } from '@nestjs/common';
import {DatabaseService} from "../database/database.service";

@Injectable()
export class UserService {
    constructor(private readonly databaseService: DatabaseService) {}

    async findOne(email: string) {
        return this.databaseService.users.findUnique({
            where : {email : email}
        })
    }
}
