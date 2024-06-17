import {Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {LocalGuard} from "./guards/local.guard";
import {Request, Response} from "express";
import {JwtAuthGuard} from "./guards/jwt.guard";
import {Prisma} from "@prisma/client";

@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService) {}

    @Post('login')
    @UseGuards(LocalGuard)
    @HttpCode(HttpStatus.ACCEPTED)
    async login(@Req() req : Request, @Res() res : Response){
        await this.setJWTCookie(req.user.toString(), res)

        res.send()
    }


    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    async signup(@Body() body : Prisma.UsersCreateInput, @Res() res : Response){
        await this.setJWTCookie(await this.authService.createUser(body), res)

        res.send()
    }

    @Get('status')
    @UseGuards(JwtAuthGuard)
    async status(@Req() req : Request){}

    private async setJWTCookie(token : string, res : Response){
        res.cookie('jwt', token, {
            expires: new Date(new Date().getTime() + 30 * 1000),
            httpOnly: true,
        })
    }
}
