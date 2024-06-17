import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LocalGuard} from "./guards/local.guard";
import {Request} from "express";
import {JwtAuthGuard} from "./guards/jwt.guard";
import {Prisma} from "@prisma/client";

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService) {}

    @Post('login')
    @UseGuards(LocalGuard)
    async login(@Req() req : Request){
        return req.user
    }


    @Post('signup')
    async signup(@Body() body : Prisma.UsersCreateInput){
        return this.authService.createUser(body)
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    async status(@Req() req : Request){}
}
