import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto.js';
import { PatchUserDto } from './dto/patch-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { User } from './schemas/user.schema.js';
import * as bcrypt from 'bcrypt';
import { hash } from 'crypto';

@Injectable()
export class UsersService {
  @InjectModel(User.name)
  private readonly users: Model<User>;

  async findAll() {
    try{
        return await this.users.find();
    }catch(error){
        throw error
    }
  }

  async findOne(id: string) {
    try{
        return await this.users.findById(id);
    }catch(error){
        throw error
    }
  }

  async create(dto: CreateUserDto) {
    try{
        const users = await this.findAll();
        if(users.some((u: any) => u.user == dto.user)) throw new ConflictException('El nombre de usuario ya está registrado. Por favor, elige otro.'); 
        const hashPassword = await bcrypt.hash(dto.password, 10);
        dto.password = hashPassword;
        return await this.users.create(dto);
    }catch(error){
        throw error
    }
  }

  async update(id: string, dto: UpdateUserDto) {
    try{
        const users = await this.findAll();
        
        if(users.some((u: any) => u.user == dto.user && u._id.toString() != id)) throw new ConflictException('El nombre de usuario ya está registrado. Por favor, elige otro.'); 

        let hashPassword = null;
        
        if(dto.password){
            hashPassword = await bcrypt.hash(dto.password, 10);
            dto.password = hashPassword;
        }

        return await this.users.findByIdAndUpdate(id, dto, { new: true });
    }catch(error){
        throw error
    }
  }

//   async patch(id: string, dto: PatchUserDto) {
//     return await this.users.findByIdAndUpdate(id, dto, { new: true, runValidators: true }).exec();
//   }
}