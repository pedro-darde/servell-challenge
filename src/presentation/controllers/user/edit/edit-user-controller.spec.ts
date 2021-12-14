import {UserModel} from "../../../../domain/models/user-result";
import {EditUserController} from "./edit-user-controller";
import {serverError} from "../../../../infra/helpers/http-helper";
import {EditUser, UserEditModel} from "../../../../domain/usecase/edit-user";
import {LoadUsers} from "../../../../domain/usecase/load-users";


const makeEditUserStub = (): EditUser => {
    class EditUserStub implements EditUser {
        async edit(id: string, data: UserEditModel): Promise<UserModel> {
            return null
        }
    }

    return new EditUserStub()
}

const makeLoadUserByIdStub = (): LoadUsers => {
    class LoadUserByIdStub implements LoadUsers {
        async loadById(id: string): Promise<UserModel | undefined> {
            return null
        }

        load(): Promise<UserModel[]> {
            return Promise.resolve([]);
        }
    }

    return new LoadUserByIdStub()
}

interface SutTypes {
    editUserStub: EditUser,
    loadUserByIdStub: LoadUsers
    sut: EditUserController
}

const makeSut = (): SutTypes => {
    const editUserStub = makeEditUserStub()
    const loadUserByIdStub = makeLoadUserByIdStub()
    const sut = new EditUserController(editUserStub, loadUserByIdStub);

    return {
        editUserStub,
        loadUserByIdStub,
        sut
    }
}

describe('EditUserController', () => {
    test('Should call edit user with correct values', async () => {
        const {sut, editUserStub} = makeSut()
        const addUserSpy = jest.spyOn(editUserStub, 'edit')
        await sut.handle({params: {id: 'any_id'}, body: {nome: 'any_nome', cargo: 'any_cargo', idade: 20}})

        expect(addUserSpy).toHaveBeenCalledWith('any_id', {nome: 'any_nome', cargo: 'any_cargo', idade: 20})
    })

    test('Should return 500 if edit user throws', async () => {
        const {sut, editUserStub} = makeSut()
        jest.spyOn(editUserStub, 'edit').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const httpResponse = await sut.handle({
            params: {id: 'any_id'},
            body: {nome: 'any_nome', cargo: 'any_cargo', idade: 20}
        })
        expect(httpResponse).toEqual(serverError(new Error()))
    })
})
