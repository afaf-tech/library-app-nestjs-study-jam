import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RoleEnum } from 'src/common/config/role.enum';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  const user1 = new UserEntity();
  user1.name = 'John';
  user1.username = 'johny';
  user1.role = RoleEnum.User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(user1),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findByUsername', async () => {
    const result = await service.findByUsername('john');
    console.log(result);

    expect(service.findByUsername('john')).resolves.toEqual(user1);
  });
});
