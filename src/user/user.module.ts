import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AnimalModule } from '../animal/animal.module';
import { AnimalService } from '../animal/animal.service';

@Module({
  imports: [AnimalModule],
  controllers: [UserController],
  providers: [UserService, AnimalService],
})
export class UserModule {}
