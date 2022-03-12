import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEnum } from 'src/common/config/role.enum';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserSeeder {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async seed(): Promise<void> {
    await this.userRepository.clear();
    const user = this.userRepository.create({
      username: 'user',
      password: 'user123',
      name: 'user123',
      role: RoleEnum.User,
    });
    const admin = this.userRepository.create({
      username: 'admin',
      password: 'admin123',
      name: 'admin123',
      role: RoleEnum.Admin,
    });
    await Promise.all([
      this.userRepository.save(user),
      this.userRepository.save(admin),
    ]);
  }
}
