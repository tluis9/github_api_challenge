import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository, FindOneOptions  } from 'typeorm';
import { UsersEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import axios from 'axios';
import { MessagesHelper } from 'src/helpers/messages.helper';
import { hashSync, compareSync } from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly usersRepository: Repository<UsersEntity>
    ){}

    async findAll() {
        const users = await this.usersRepository.find();
        return users.map(({ password, ...user }) => user);
    }
    

    async findOneOrFail(
        options?: FindOneOptions<UsersEntity>
    ){
        try {
            return await this.usersRepository.findOneOrFail(options)
        } catch (error) {
            throw new NotFoundException(error.message)
        }
    }

    async store(data: CreateUserDto) {
        const githubData = await this.fetchGitHubData(data.userTag);
      
        const user: Partial<UsersEntity> = {
          ...data,
          repos: githubData.public_repos,
          followers: githubData.followers,
          following: githubData.following,
          name: githubData.name,
          bio: githubData.bio,
          twitter: githubData.twitter_username,
          company: githubData.company,
          site: githubData.url,
        };
      
        const newObject = this.usersRepository.create(user);
        return await this.usersRepository.save(newObject);
    }
      

    async fetchGitHubData(userTag: string): Promise<any> {
        try {
          const response = await axios.get(`https://api.github.com/users/${userTag}`);
          return response.data;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                throw new NotFoundException(MessagesHelper.USER_NOT_FOUND_GITHUB);
              } else {
                console.log(error.response.data);
              }
              throw error;
        }
    }
    

    async update(id: string, data: UpdateUserDto) {
        const user = await this.findOneOrFail({ where: { id } });

        const isCurrentPasswordValid = await compareSync(data.currentPassword, user.password);
      
        if (!isCurrentPasswordValid) {
            console.log("entrou aqui => ", isCurrentPasswordValid)
          throw new BadRequestException('Senha atual incorreta.');
        }

        if (data.currentPassword) {
          const newHashedPassword = await hashSync(data.newPassword, 10);
          user.password = newHashedPassword;
        }
      
        this.usersRepository.merge(user, data);
        return await this.usersRepository.save(user);
    }
      

    async destroy(id: string){
        await this.findOneOrFail({ where: { id } });
        this.usersRepository.softDelete({ id })
    }
}
