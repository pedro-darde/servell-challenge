import {ObjectId} from "mongodb";
import {UserEditModel} from "../../../../domain/usecase/edit-user";
import {UserModel} from "../../../../domain/models/user-result";

export interface EditUserRepository {
  edit: (id: string, newUserData: UserEditModel) => Promise<UserModel>;
}
