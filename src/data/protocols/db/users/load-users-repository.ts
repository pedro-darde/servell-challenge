import { UserModel } from "@src/domain/models/user-result";

export interface LoadUsersRepository {
  load: () => Promise<UserModel[]>;
}
