import {AddUser, AddUserModel} from "../../../../domain/usecase/add-user";
import {UserModel} from "../../../../domain/models/user-result";
import {serverError} from "../../../../infra/helpers/http-helper";
import {AddUserController} from "../add/add-user-controller";
import {LoadUsers} from "../../../../domain/usecase/load-users";
import {LoadUsersController} from "./load-users-controller";


const makeLoadUsersStub = (): LoadUsers => {
    class LoadUsersStub implements LoadUsers {
        async load(): Promise<UserModel[]> {
            return [{nome: 'any_nome', cargo: 'any_cargo', idade: 12, id: 'any_id'}]
        }
    }

    return new LoadUsersStub()
}

interface SutTypes {
    loadUserStub: LoadUsers,
    sut: LoadUsersController
}

const makeSut = (): SutTypes => {
    const loadUserStub = makeLoadUsersStub()
    const sut = new LoadUsersController(loadUserStub);

    return {
        loadUserStub,
        sut
    }

}
describe('LoadUserController', () => {
    test('Should call add user with correct values', async () => {
        const {sut} = makeSut()
        const httpResponse = await sut.handle({})
        expect(httpResponse.body).toBeTruthy()
    })

    test('Should return 500 if add user throws', async () => {
        const {sut, loadUserStub} = makeSut()
        jest.spyOn(loadUserStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(serverError(new Error()))
    })
})
