import {LoadUsers} from "../../../../domain/usecase/load-users";
import {LoadUsersRepository} from "../../../protocols/db/users/load-users-repository";
import {UserModel} from "../../../../domain/models/user-result";

export class DbLoadUsers implements LoadUsers {
    private readonly loadUsersRepository: LoadUsersRepository

    constructor(loadUsersRepository: LoadUsersRepository) {
        this.loadUsersRepository = loadUsersRepository
    }

    async load(): Promise<UserModel[]> {
        return await this.loadUsersRepository.load();
    }

    async loadById(id: string): Promise<UserModel | undefined> {
        return await this.loadUsersRepository.loadById(id);
    }
}
