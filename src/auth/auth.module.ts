import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {LocalStrategy} from "./strategies/local.strategy";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./strategies/jwt.strategy";

@Module({
  imports : [
      PassportModule,
      JwtModule.register(
          {
            // TODO : MOVE SECRET TO .env
            secret : 'lol',
            signOptions : {expiresIn : '1h'}
          }
      )
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
