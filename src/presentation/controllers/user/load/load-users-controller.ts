import {Controller} from "../../../protocols/controller";
import {HttpRequest, HttpResponse} from "../../../protocols/http";
import {serverError} from "../../../../infra/helpers/http-helper";
import {LoadUsers} from "../../../../domain/usecase/load-users";

export class LoadUsersController implements Controller {
    private readonly loadUsers: LoadUsers

    constructor(loadUsers: LoadUsers) {
        this.loadUsers = loadUsers
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const users = await this.loadUsers.load()

            return {
                statusCode: 201,
                body: users
            }
        } catch (e) {
            return serverError(e)
        }
    }
}
