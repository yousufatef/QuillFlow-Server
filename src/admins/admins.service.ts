import { AuthProvider } from '../auth/auth.provider';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { UserProfile } from '../utils/types';
import { UserType } from '../utils/enums';
import { join } from 'node:path';
import { unlinkSync, existsSync } from 'node:fs';
import { User } from '../users/entities/user.entity';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminsService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    // private readonly AuthProvider: AuthProvider,
    // private readonly jwtService: JwtService,

  ) { }


  async create(createAdminDto: CreateAdminDto) {
    const { email, username, password, roleId } = createAdminDto;

    const existingEmail = await this.userRepository.findOne({
      where: {
        email,
        userType: UserType.ADMIN
      }
    });

    if (existingEmail) {
      throw new BadRequestException('common.admins.alreadyExists');
    }

    const hashedPassword = await this.hashPassword(password);

    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
      roleId,
      userType: UserType.ADMIN,
    });

    return this.userRepository.save(user);
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    const { email, username, password } = updateAdminDto;
    try {
      const user = await this.userRepository.findOne({ where: { id, userType: UserType.ADMIN } });
      if (!user) {
        throw new BadRequestException('common.admins.notFound');
      }
      user.username = username as string;
      user.password = await this.hashPassword(password);
      user.email = email

      await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw error;
    }
  }


  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async uploadProfileImage(newProfileImage: string, userId: number) {
    const user = await this.getCurrentUser(userId);

    if (user.profileImage === null) {
      user.profileImage = newProfileImage;
    } else {
      await this.removeProfileImage(userId);
      user.profileImage = newProfileImage;
    }
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('common.users.notFound');
    }

    // Clean up profile image before deleting user
    if (user.profileImage) {
      const imagePath = join(process.cwd(), `uploads/profile-images/${user.profileImage}`);
      if (existsSync(imagePath)) {
        unlinkSync(imagePath);
      }
    }

    await this.userRepository.delete(id);
    return null;
  }

  async removeProfileImage(userId: number) {
    const user = await this.getCurrentUser(userId);

    if (user.profileImage === null) {
      throw new BadRequestException('common.users.noProfileImage');
    }

    const imagePath = join(process.cwd(), `uploads/profile-images/${user.profileImage}`);

    if (existsSync(imagePath)) {
      unlinkSync(imagePath);
    }

    user.profileImage = null as any;
    return this.userRepository.save(user);
  }

  async getCurrentUser(id: number): Promise<UserProfile> {


    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException('common.users.notFound');
    }
    return user;

  }

  getAllUsers(): Promise<User[]> {
    return this.userRepository.find({ where: { userType: UserType.ADMIN } });
  }

  async getUserById(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id, userType: UserType.ADMIN } });
      if (!user) {
        throw new BadRequestException('common.admins.notFound');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}
