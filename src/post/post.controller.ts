import {Body, Controller, Get, Param, ParseIntPipe, Post} from '@nestjs/common';
import { PostService } from './post.service';
import {Prisma} from "@prisma/client";

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAll(){
    return this.postService.getAll()
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getById(id)
  }

  @Post()
  async create(@Body() postDto : Prisma.PostsCreateInput){
    return this.postService.create(postDto)
  }

}
