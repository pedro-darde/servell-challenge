import {Controller} from "../../../../../presentation/protocols/controller";
import {UserMongoRepository} from "../../../../../infra/db/mongo/user/user-mongo-repository";
import {LogMongoRepository} from '../../../../../infra/db/mongo/log/log-mongo-repository';
import {LogControllerDecorator} from "../../../../decorators/log-controller-decorator";
import {EditUserController} from "../../../../../presentation/controllers/user/edit/edit-user-controller";
import {DbEditUser} from "../../../../../data/usecases/user/edit/db-edit-user";

export const makeEditUserController = (): Controller => {
    const editUserRepository = new UserMongoRepository()
    const dbEditUser = new DbEditUser(editUserRepository)
    const controller = new EditUserController(dbEditUser)

    const logMongoRepository = new LogMongoRepository()

    return new LogControllerDecorator(controller, logMongoRepository)
}
