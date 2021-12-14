import {UserModel} from "../../../../domain/models/user-result";

export interface LoadUsersRepository {
  load: () => Promise<UserModel[]>;
}
