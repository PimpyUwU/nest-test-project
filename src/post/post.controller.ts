import {Controller, Get, Param} from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAll(){
    return this.postService.getAll()
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    return this.postService.getById(id)
  }

}
