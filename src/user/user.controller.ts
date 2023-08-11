import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';
import { PublicUserInfoDto } from '../common/query/user.query.dto';
import { PublicUserData } from './interface/user.interface';
import {
  ApiPaginatedResponse,
  PaginatedDto,
} from '../common/pagination/response';

@ApiTags('User')
@ApiExtraModels(PublicUserData, PaginatedDto)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard())
  @ApiPaginatedResponse('entities', PublicUserData)
  @Get('list')
  async getUserList(@Query() query: PublicUserInfoDto) {
    return this.userService.getUserList(query);
  }

  @Get(':userId')
  async getUserSingle(@Param('userId') userId: string) {
    return this.userService.getUserSingle(userId);
  }

  @Post('create')
  async createUser(@Req() req: any, @Body() body: UserCreateDto) {
    return this.userService.createUser(body);
  }

  @Put(':userId')
  async updateUserSingle(
    @Req() req: any,
    @Body() body: UserCreateDto,
    @Param('userId') userId: string,
  ) {
    return this.userService.updateUserSingle(userId, body);
  }
}
