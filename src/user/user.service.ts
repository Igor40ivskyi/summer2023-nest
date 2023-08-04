import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCreateDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { PublicUserInfoDto } from '../common/query/user.query.dto';

@Injectable()
export class UserService {
  private userList = [];
  private salt = 5;

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly authService: AuthService,
  ) {}

  async getUserList(query: PublicUserInfoDto) {
    query.sort = query.sort || 'id';
    query.order = query.order || 'ASC';
    const options = {
      page: query.page || 1,
      limit: query.limit || 2,
    };

    const queryBuilder = this.userRepository
      .createQueryBuilder('users')
      .select('id, age, email, "userName"');

    if (query.search) {
      queryBuilder.where('"userName" IN(:...search', {
        search: query.search.split(','),
      });
    }

    queryBuilder.orderBy(`"${query.sort}"`, query.order as 'ASC' | 'DESC');

    return this.userRepository.find();
  }

  async createUser(data: UserCreateDto) {
    const foundUser = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });

    if (foundUser) {
      throw new HttpException(
        'User with given email exist already',
        HttpStatus.BAD_REQUEST,
      );
    }

    data.password = await this.getHash(data.password);
    const newUser = await this.userRepository.create(data);
    await this.userRepository.save(newUser);

    const token = await this.signIn(newUser);

    return { token };
  }

  async getHash(password: string) {
    return await bcrypt.hash(password, this.salt);
  }

  async signIn(user) {
    return await this.authService.signIn({
      id: user.id.toString(),
    });
  }

  async getUserSingle(userId: string) {
    return this.userList.find((item) => item.id.toString() === userId);
  }

  async updateUserSingle(userId: string, data) {
    const indexForUpdate = this.userList.findIndex(
      (item) => item.id.toString() === userId,
    );
    this.userList[indexForUpdate] = data;
    return this.userList[indexForUpdate];
  }

  async deleteUserSingle(userId: string) {
    const indexForDelete = this.userList.findIndex(
      (item) => item.id.toString() === userId,
    );

    if (indexForDelete !== -1) {
      this.userList.splice(indexForDelete, 1);
    }

    return 'xxx';
  }
}
