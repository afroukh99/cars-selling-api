import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';




@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepo: Repository<User>) { }




    async findOne(id: number) {
        if (!id) return null;
        else return await this.usersRepo.findOneBy({ id })
    }


    find(email: string) {
        return this.usersRepo.findBy({ email })
    }



    async create(email: string, username: string, password: string) {
        const newUser = this.usersRepo.create({ email, username, password })
        return this.usersRepo.save(newUser)
    }


    async getUsers() {
        return this.usersRepo.find()
    }



    async update(id: number, attbs: Partial<User>) {
        const user = await this.findOne(id)

        if (!user) {
            throw new NotFoundException("User not found")
        }
        Object.assign(user, attbs)
        return await this.usersRepo.save(user)
    }



    async delete(id: number) {
        const user = await this.findOne(id)
        if (!user) {
            throw new NotFoundException("User not found")
        }
        return this.usersRepo.remove(user);
    }

}
