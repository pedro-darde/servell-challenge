import {Controller} from "../../../../../presentation/protocols/controller";
import {UserMongoRepository} from "../../../../../infra/db/mongo/user/user-mongo-repository";
import {LogMongoRepository} from '../../../../../infra/db/mongo/log/log-mongo-repository';
import {LogControllerDecorator} from "../../../../decorators/log-controller-decorator";
import {DbRemoveUser} from "../../../../../data/usecases/user/remove/db-remove-user";
import {RemoveUserController} from "../../../../../presentation/controllers/user/remove/remove-user-controller";

export const makeRemoveUserController = (): Controller => {
    const removeUserRepository = new UserMongoRepository()
    const dbRemoveUser = new DbRemoveUser(removeUserRepository)
    const controller = new RemoveUserController(dbRemoveUser)

    const logMongoRepository = new LogMongoRepository()

    return new LogControllerDecorator(controller, logMongoRepository)
}
