import { UserModel } from "@src/domain/models/user-result";
import { AddUserModel } from "@src/domain/usecase/add-user";

export interface AddUserRepository {
  add: (user: AddUserModel) => Promise<UserModel>;
}
