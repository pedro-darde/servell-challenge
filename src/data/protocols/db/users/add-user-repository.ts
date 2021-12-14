import {AddUserModel} from "../../../../domain/usecase/add-user";
import {UserModel} from "../../../../domain/models/user-result";


export interface AddUserRepository {
  add: (user: AddUserModel) => Promise<UserModel>;
}
