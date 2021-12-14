import {AddUser, AddUserModel} from "../../../../domain/usecase/add-user";
import {AddUserRepository} from "../../../protocols/db/users/add-user-repository";
import {UserModel} from "../../../../domain/models/user-result";

export class DbAddUser implements AddUser {
  private readonly addUserRepository: AddUserRepository;

  constructor(addUserRepository: AddUserRepository) {
    this.addUserRepository = addUserRepository;
  }

  async add(user: AddUserModel): Promise<UserModel> {
    const insertedUser = await this.addUserRepository.add(user);

    return insertedUser;
  }
}
