import { Injectable } from '@nestjs/common';
import {DatabaseService} from "../database/database.service";
import { Prisma } from '@prisma/client';

@Injectable()
export class PostService {
    constructor(private readonly databaseService: DatabaseService) {}
    async getAll(){
        return this.databaseService.posts.findMany({})

    }

    async getById(id : number){
        return this.databaseService.posts.findUnique({
            where: { post_id : id },
        })
    }

    async create(createProductDto : Prisma.PostsCreateInput) {
        return this.databaseService.posts.create({
            data : createProductDto
        })
    }
}
