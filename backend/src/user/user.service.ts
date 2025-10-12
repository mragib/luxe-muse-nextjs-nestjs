import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  ChangeRoleDto,
  CreateGoogleUserDto,
  CreateUserDto,
} from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsNull, Repository } from 'typeorm';
import { hash } from 'argon2';
import { ApiResponse } from 'src/types/types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<ApiResponse<User>> {
    const user = await this.findByEmail(createUserDto.email);
    const phone = await this.findByPhone(createUserDto.phone);
    if (user) {
      throw new ConflictException('User with this email already exists');
    }
    if (phone) {
      throw new ConflictException('User with this phone number already exists');
    }
    const { password } = createUserDto;
    const hashedPassword = await hash(password);

    createUserDto.password = hashedPassword;

    const newUser = await this.userRepository.save(createUserDto);

    return {
      status: 'success',
      statuscode: 200,
      data: newUser,
      message: 'User has been created',
    };
  }

  async changeRole(changeRole: ChangeRoleDto): Promise<ApiResponse<User>> {
    const { userId } = changeRole;

    try {
      const user = await this.findOne(userId);

      if (!user) throw new NotFoundException('User is not found');

      const updatedUser = await this.userRepository.save({
        ...user,
        id: userId,
        role: changeRole.role,
      });

      return {
        status: 'success',
        statuscode: 200,
        data: updatedUser,
        message: 'User has been created',
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async createGoogleUser(
    createUserDto: CreateGoogleUserDto,
  ): Promise<ApiResponse<User>> {
    try {
      const user = await this.userRepository.save(createUserDto);

      return {
        status: 'success',
        statuscode: 200,
        data: user,
        message: 'User has been created',
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Something went Wrong!');
    }
  }

  async updateRefreshToken(id: string, refreshToken: string | null) {
    try {
      const token = await this.userRepository.update(id, {
        refreshToken,
      });

      return token;
    } catch (error) {
      throw new InternalServerErrorException('Error on refresh token update');
    }
  }

  async findAll(): Promise<ApiResponse<User[]>> {
    const [user, count] = await this.userRepository.findAndCount();
    return {
      status: 'success',
      statuscode: 200,
      data: user,
      count,
    };
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
        deletedAt: IsNull(), // Explicitly check for null
      },
    });
  }

  async findByPhone(phone: string) {
    return await this.userRepository.findOne({
      where: {
        phone,
        deletedAt: IsNull(), // Explicitly check for null
      },
    });
  }

  findOne(id: string) {
    return this.userRepository.findOne({ where: { id, deletedAt: IsNull() } });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ApiResponse<User>> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User is not found');
    }
    const updatedUser = await this.userRepository.save({
      id,
      ...updateUserDto,
    });

    return {
      status: 'success',
      statuscode: 200,
      data: updatedUser,
      message: 'User has been Updated',
    };
  }

  async remove(id: string) {
    await this.userRepository.softDelete(id);

    return {
      status: 'success',
      statuscode: 200,
      message: 'User has been Deleted',
    };
  }
}
