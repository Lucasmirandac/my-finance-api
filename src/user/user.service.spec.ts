// user.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        password: 'testpassword',
        email: 'test@example.com',
      };

      const createdUser: User = {
        id: '1',
        ...createUserDto,
      };

      jest.spyOn(userRepository, 'create').mockReturnValue(createdUser);
      jest.spyOn(userRepository, 'save').mockResolvedValue(createdUser);

      expect(await service.create(createUserDto)).toEqual(createdUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users: User[] = [
        {
          id: '1',
          username: 'test',
          password: 'test',
          email: 'user1@example.com',
          createdAt: Date.now().toString(),
          dateOfBirth: Date.now().toString(),
          fullName: 'Lucas de Miranda Costa',
        },
      ];
      jest.spyOn(userRepository, 'find').mockResolvedValue(users);
      expect(await service.findAll()).toEqual(users);
    });

    it('should return an empty array if no users exist', async () => {
      jest.spyOn(userRepository, 'find').mockResolvedValue([]);
      expect(await service.findAll()).toEqual([]);
    });
  });
});
