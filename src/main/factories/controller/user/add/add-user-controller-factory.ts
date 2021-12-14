import {Controller} from "../../../../../presentation/protocols/controller";
import {AddUserController} from "../../../../../presentation/controllers/user/add/add-user-controller";
import {DbAddUser} from "../../../../../data/usecases/user/add/db-add-user";
import {UserMongoRepository} from "../../../../../infra/db/mongo/user/user-mongo-repository";
import {LogMongoRepository} from '../../../../../infra/db/mongo/log/log-mongo-repository';
import {LogControllerDecorator} from "../../../../decorators/log-controller-decorator";

export const makeAddUserController = (): Controller => {
    const addUserRepository = new UserMongoRepository()
    const dbAddUser = new DbAddUser(addUserRepository)
    const controller = new AddUserController(dbAddUser)

    const logMongoRepository = new LogMongoRepository()

    return new LogControllerDecorator(controller, logMongoRepository)
}
