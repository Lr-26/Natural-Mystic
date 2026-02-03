import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async create(email: string, password: string): Promise<UserDocument> {
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new ConflictException('El correo electrónico ya está registrado');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({ email, password: hashedPassword });
        return newUser.save();
    }

    async findOneByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async findAll(): Promise<UserDocument[]> {
        return this.userModel.find().exec();
    }

    async findById(id: string): Promise<UserDocument | null> {
        return this.userModel.findById(id).exec();
    }

    async updateRole(id: string, role: string): Promise<UserDocument | null> {
        return this.userModel.findByIdAndUpdate(
            id,
            { role },
            { new: true }
        ).exec();
    }

    async deleteUser(id: string): Promise<UserDocument | null> {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}
