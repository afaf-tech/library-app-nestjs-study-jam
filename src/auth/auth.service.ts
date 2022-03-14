import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    const checkPassword = await user.comparePassword(password);
    if (user && checkPassword) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
