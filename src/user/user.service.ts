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
