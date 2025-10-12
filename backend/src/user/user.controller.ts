import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ChangeRoleDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/decorators/role.decorators';
import { Role } from 'src/types/types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  findAll() {
    return this.userService.findAll();
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Post('change-role')
  changeRole(@Body() changeRoleDto: ChangeRoleDto) {
    return this.userService.changeRole(changeRoleDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Roles(Role.SUPERADMIN, Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
