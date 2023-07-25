import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  private userList = [];

  async getUserList() {
    return this.userList;
  }

  async createUser(data) {
    return this.userList.push(data);
  }

  async getUserProfile(userId: string) {
    return this.userList.find((item) => item.id.toString() === userId);
  }
}
