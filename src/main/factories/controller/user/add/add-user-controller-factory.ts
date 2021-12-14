import { Controller } from "../../../../../presentation/protocols/controller";
import { AddUserController } from "../../../../../presentation/controllers/user/add/add-user-controller";
import { DbAddUser } from "../../../../../data/usecases/user/add/db-add-user";
import { UserMongoRepository } from "../../../../../infra/db/mongo/user/user-mongo-repository";
import { LogMongoRepository } from "../../../../../infra/db/mongo/log/log-mongo-repository";
import { LogControllerDecorator } from "../../../../decorators/log-controller-decorator";
import { ValidationComposite } from "../../../../../validation/validation-composite";
import { Validation } from "../../../../../presentation/protocols/validation";
import { RequiredFieldValidation } from "../../../../../validation/required-field-validation";

export const makeAddUserController = (): Controller => {
  // validação dos campos obrigatórios
  const validations: Validation[] = [];

  for (const field of ["cargo", "nome", "idade"]) {
    validations.push(new RequiredFieldValidation(field));
  }
  const fieldsValidations = new ValidationComposite(validations);

  const addUserRepository = new UserMongoRepository();
  const dbAddUser = new DbAddUser(addUserRepository);
  const controller = new AddUserController(dbAddUser, fieldsValidations);

  const logMongoRepository = new LogMongoRepository();

  return new LogControllerDecorator(controller, logMongoRepository);
};
