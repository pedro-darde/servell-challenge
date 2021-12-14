import {RemoveUser} from "../../../../domain/usecase/remove-user";
import {RemoveUserRepository} from "../../../protocols/db/users/remove-user-repository";

export class DbRemoveUser implements RemoveUser {
    private readonly removeUserRepository: RemoveUserRepository

    constructor(removeUserRepository: RemoveUserRepository) {
        this.removeUserRepository = removeUserRepository
    }

    async remove (id: string) : Promise<void> {
        await this.removeUserRepository.remove(id)
    }
}
