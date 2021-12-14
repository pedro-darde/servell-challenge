import {Controller} from "../../../protocols/controller";
import {HttpRequest, HttpResponse} from "../../../protocols/http";
import {AddUser} from "../../../../domain/usecase/add-user";
import {serverError} from "../../../../infra/helpers/http-helper";

export class AddUserController implements Controller {
    private readonly addUser: AddUser

    constructor(addUser: AddUser) {
        this.addUser = addUser
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const user = await this.addUser.add(httpRequest.body)

            return {
                statusCode: 201,
                body: user
            }
        } catch (e) {
            return serverError(e)
        }
    }
}
