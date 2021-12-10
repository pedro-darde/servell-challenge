import { UserModel } from "@src/domain/models/user-result";
import { UserEditModel } from "@src/domain/usecase/edit-user";

interface EditUserRepository {
  add: (id: string, newUserData: UserEditModel) => Promise<UserModel>;
}
