import {User} from './user.interface';

export interface GetUsersRes {
  success: boolean,
  users: User[]
}
