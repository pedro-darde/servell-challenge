import {Controller} from "../../../protocols/controller";
import {HttpRequest, HttpResponse} from "../../../protocols/http";
import {badRequest, serverError} from "../../../../infra/helpers/http-helper";
import {EditUser} from "../../../../domain/usecase/edit-user";
import {MissingParamError} from "../../../errors/missing-param-error";
import {ResultNotFoundError} from "../../../errors/result-not-found-error";
import {LoadUsers} from "../../../../domain/usecase/load-users";

export class EditUserController implements Controller {
    private readonly editUser: EditUser
    private readonly loadUserById: LoadUsers

    constructor(editUser: EditUser, loadUserById: LoadUsers) {
        this.editUser = editUser
        this.loadUserById = loadUserById
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const {id} = httpRequest.params

            if (!id) {
                return badRequest(new MissingParamError('id'));
            }

            const existUser = this.loadUserById.loadById(id)

            if (!existUser) {
                return badRequest(new ResultNotFoundError())
            }

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
