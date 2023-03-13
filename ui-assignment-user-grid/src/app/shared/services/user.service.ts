import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser, UserStatus } from '../models/user.model';
import { Utils } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private source: IUser[] = [
    {
      userId: 'admin',
      firstName: 'Admin',
      lastName: 'User',
      email: 'support@cixsoft.com',
      status: UserStatus.Registered,
      createdOn: new Date(),
    },
    {
      userId: 'megray',
      firstName: 'Meg',
      lastName: 'Ray',
      email: 'meg@fas.com',
      status: UserStatus.Initiated,
      createdOn: new Date(),
    },
    {
      userId: 'tomh',
      firstName: 'Tom',
      lastName: 'H',
      email: 'tom@test.com',
      status: UserStatus.Initiated,
      createdOn: new Date(),
    },
  ];

  mockUsers = structuredClone(this.source);

  constructor() {}

  getUsers(searchString: string = ''): Observable<IUser[]> {
    const users = structuredClone(this.mockUsers);
    searchString = searchString?.trim()?.toLowerCase() || '';
    if (!searchString || !users.length) {
      return of(users);
    }
    const keys = Object.keys(users[0]); // Use first item as key reference
    return of(
      users.filter((user: IUser) => {
        let found = false;
        for (let i = 0; i <= keys.length; i++) {
          const value = Utils.getUnknownPropertyValue(
            user,
            keys[i]
          ) as string;
          if (value && value.toString().toLowerCase().indexOf(searchString) > -1) {
            found = true;
            break;
          }
        }
        return found;
      })
    );
  }

  addUser(user: IUser): Observable<IUser> {
    this.mockUsers.push(user);
    return of(user);
  }

  editUser(user: IUser): Observable<IUser | undefined> {
    const matchUser = this.mockUsers.find((u: IUser) => u.userId === user.userId);
    if (matchUser) {
      matchUser.firstName = user.firstName;
      matchUser.lastName = user.lastName;
      matchUser.email = user.email;
      matchUser.status = user.status;
    }
    return of(matchUser);
  }

  deleteUsers(userIds: string[]): Observable<boolean> {
    this.mockUsers = this.mockUsers.filter(
      (u: IUser) => userIds.indexOf(u.userId) === -1
    );
    return of(true);
  }

  refresh(): Observable<IUser[]> {
    this.mockUsers = structuredClone(this.source);
    return this.getUsers();
  }
}
