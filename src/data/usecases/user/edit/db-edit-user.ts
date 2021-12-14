import {EditUser, UserEditModel} from "../../../../domain/usecase/edit-user";
import {EditUserRepository} from "../../../protocols/db/users/edit-user-repository";
import {UserModel} from "../../../../domain/models/user-result";

export class DbEditUser implements EditUser {
    private readonly editUserRepository: EditUserRepository

    constructor(editUserRepository: EditUserRepository) {
        this.editUserRepository = editUserRepository
    }

    async edit(id: string, accountEdit: UserEditModel): Promise<UserModel> {
        const account = await this.editUserRepository.edit(id, accountEdit)

        return account
    }
}
