import {Controller} from "../../../protocols/controller";
import {HttpRequest, HttpResponse} from "../../../protocols/http";
import {serverError} from "../../../../infra/helpers/http-helper";
import {RemoveUser} from '../../../../domain/usecase/remove-user';

export class RemoveUserController implements Controller {
    private readonly removeUser: RemoveUser

    constructor(removeUser: RemoveUser) {
        this.removeUser = removeUser
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const {id} = httpRequest.params
            const user = await this.removeUser.remove(id)
            return {
                statusCode: 200,
                body: user
            }
        } catch (e) {
            return serverError(e)
        }
    }
}
