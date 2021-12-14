import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { AddUser } from "../../../../domain/usecase/add-user";
import { badRequest, serverError } from "../../../../infra/helpers/http-helper";
import { Validation } from "../../../protocols/validation";

export class AddUserController implements Controller {
  private readonly addUser: AddUser;
  private readonly validation: Validation;

  constructor(addUser: AddUser, validation: Validation) {
    this.addUser = addUser;
    this.validation = validation;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);

      if (error) {
        return badRequest(error);
      }

      const user = await this.addUser.add(httpRequest.body);

      return {
        statusCode: 201,
        body: user,
      };
    } catch (e) {
      return serverError(e);
    }
  }
}
