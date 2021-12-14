import {AddUser, AddUserModel} from "../../../../domain/usecase/add-user";
import {UserModel} from "../../../../domain/models/user-result";
import {AddUserController} from "./add-user-controller";
import {serverError} from "../../../../infra/helpers/http-helper";


const makeAddUserStub = (): AddUser => {
    class AddUserStub implements AddUser {
        async add(data: AddUserModel): Promise<UserModel> {
            return null
        }
    }

    return new AddUserStub()
}

interface SutTypes {
    addUserStub: AddUser,
    sut: AddUserController
}

const makeSut = (): SutTypes => {
    const addUserStub = makeAddUserStub()
    const sut = new AddUserController(addUserStub);

    return {
        addUserStub,
        sut
    }

}
describe('AddUserController', () => {
    test('Should call add user with correct values', async () => {
        const {sut, addUserStub} = makeSut()
        const addUserSpy = jest.spyOn(addUserStub, 'add')
        await sut.handle({body: {nome: 'any_nome', cargo: 'any_cargo', idade: 20}})

        expect(addUserSpy).toHaveBeenCalledWith({nome: 'any_nome', cargo: 'any_cargo', idade: 20})
    })

    test('Should return 500 if add user throws', async () => {
        const {sut, addUserStub} = makeSut()
        jest.spyOn(addUserStub, 'add').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const httpResponse = await sut.handle({body: {nome: 'any_nome', cargo: 'any_cargo', idade: 20}})
        expect(httpResponse).toEqual(serverError(new Error()))
    })
})
