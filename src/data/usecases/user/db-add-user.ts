import { AddUserRepository } from "@src/data/protocols/db/users/add-user-repository";
import { UserModel } from "@src/domain/models/user-result";
import { AddUser, AddUserModel } from "@src/domain/usecase/add-user";

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
