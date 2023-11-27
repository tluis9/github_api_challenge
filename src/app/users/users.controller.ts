import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/v1/users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}
    
    @Get()
    @UseGuards(AuthGuard('jwt'))
    async index(){
        return this.usersService.findAll();
    }

    @Post()
    async store(
        @Body() body: CreateUserDto
    ){
        return this.usersService.store(body)
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async show(
        @Param('id', new ParseUUIDPipe()) id: string
    ){
        try {
            const user = await this.usersService.findOneOrFail({ where: { id } });
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        } catch (error) {
            throw new NotFoundException('Usuário não encontrado');
        }
    }


    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() body: UpdateUserDto
    ){
        return this.usersService.update(id, body)
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(
        @Param('id', new ParseUUIDPipe()) id: string
    ){
        return this.usersService.destroy(id)
    }
}
