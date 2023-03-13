import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { UserStatus } from '../models/user.model';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of users that match the search string', () => {
    const searchString = 'ray';
    service.getUsers(searchString).subscribe((users) => {
      expect(users.length).toBe(1);
      expect(users[0].firstName).toBe('Meg');
      expect(users[0].lastName).toBe('Ray');
    });
  });

  it('should add a user to the list', () => {
    const newUser = {
      userId: 'testuser',
      firstName: 'Test',
      lastName: 'User',
      email: 'testuser@test.com',
      status: UserStatus.Initiated,
      createdOn: new Date(),
    };
    service.addUser(newUser).subscribe((user) => {
      expect(user).toEqual(newUser);
      expect(service.mockUsers.length).toBe(4);
    });
  });

  it('should edit an existing user', () => {
    const updatedUser = {
      userId: 'megray',
      firstName: 'Megan',
      lastName: 'Raymond',
      email: 'megan@fas.com',
      status: UserStatus.Registered,
      createdOn: new Date(),
    };
    service.editUser(updatedUser).subscribe((user) => {
      expect(user?.firstName).toBe('Megan');
      expect(user?.lastName).toBe('Raymond');
    });
  });

  it('should delete multiple users from the list', () => {
    const userIds = ['megray', 'tomh'];
    service.deleteUsers(userIds).subscribe((success) => {
      expect(success).toBe(true);
      expect(service.mockUsers.length).toBe(1);
    });
  });

  it('should refresh the list of users', () => {
    service.refresh().subscribe((users) => {
      expect(users.length).toBe(3);
      expect(service.mockUsers.length).toBe(3);
    });
  });
});