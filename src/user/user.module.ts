import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PetModule } from '../pet/pet.module';
import { AuthModule } from '../auth/auth.module';
import { PetService } from '../pet/pet.service';

@Module({
  imports: [
    PetModule,
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UserController],
  providers: [UserService, PetService],
  exports: [UserService],
})
export class UserModule {}
