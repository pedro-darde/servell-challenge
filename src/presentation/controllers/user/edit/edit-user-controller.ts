import {Controller} from "../../../protocols/controller";
import {HttpRequest, HttpResponse} from "../../../protocols/http";
import {serverError} from "../../../../infra/helpers/http-helper";
import {EditUser} from "../../../../domain/usecase/edit-user";

export class EditUserController implements Controller {
    private readonly editUser: EditUser

    constructor(editUser: EditUser) {
        this.editUser = editUser
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { id } = httpRequest.params
            const user = await this.editUser.edit(id, httpRequest.body)
            return {
                statusCode: 200,
                body: user
            }
        } catch (e) {
            return serverError(e)
        }
    }
}
