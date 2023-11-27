import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('api/v1/auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Req() req: any){
        console.log("aqui é no login", req.user)
        return await this.authService.login(req.user)
    }
}
