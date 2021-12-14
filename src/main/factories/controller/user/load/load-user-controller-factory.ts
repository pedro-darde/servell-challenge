import {Controller} from "../../../../../presentation/protocols/controller";
import {UserMongoRepository} from "../../../../../infra/db/mongo/user/user-mongo-repository";
import {LogMongoRepository} from '../../../../../infra/db/mongo/log/log-mongo-repository';
import {LogControllerDecorator} from "../../../../decorators/log-controller-decorator";
import {DbLoadUsers} from "../../../../../data/usecases/user/load/db-load-users";
import {LoadUsersController} from "../../../../../presentation/controllers/user/load/load-users-controller";

export const makeLoadUserController = (): Controller => {
    const loadUserRepository = new UserMongoRepository()
    const dbLoadUsers = new DbLoadUsers(loadUserRepository)
    const controller = new LoadUsersController(dbLoadUsers)
    const logMongoRepository = new LogMongoRepository()

    return new LogControllerDecorator(controller, logMongoRepository)
}
